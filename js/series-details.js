//To extract query parameter from page link
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const types = document.querySelectorAll(".types");
const similar = document.querySelector(".similar");
const recommend = document.querySelector(".recommend");

const similarGallery = document.querySelector(".similar-gallery");
const recommendGallery = document.querySelector(".recommend-gallery");

types.forEach((type) => {
  type.addEventListener("click", () => {
    removeActiveClasses();
    type.classList.add("active");
  });
});

function removeActiveClasses() {
  types.forEach((type) => {
    type.classList.remove("active");
  });
}

types[1].addEventListener("click", () => {
  similar.style.display = "none";
  recommend.style.display = "block";
});

types[0].addEventListener("click", () => {
  similar.style.display = "block";
  recommend.style.display = "none";
});

const poster = document.querySelector(".poster");
const details = document.querySelector(".details");

// APIs Starts Here
const DETAILS_API =
  "https://api.themoviedb.org/3/tv/" +
  id +
  "?api_key=514318c6f6f673457a51ffcaf8158cf2";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SIMILAR_API =
  "https://api.themoviedb.org/3/tv/" +
  id +
  "/similar?api_key=514318c6f6f673457a51ffcaf8158cf2&page=1";

const RECOMMEND_API =
  "https://api.themoviedb.org/3/tv/" +
  id +
  "/recommendations?api_key=514318c6f6f673457a51ffcaf8158cf2&page=1";

const VIDEO_API =
  "https://api.themoviedb.org/3/tv/" +
  id +
  "/videos?api_key=514318c6f6f673457a51ffcaf8158cf2";
// APIs Ends Here

getDetails(DETAILS_API);

async function getDetails(url) {
  const res = await fetch(url);
  const data = await res.json();

  showDetails(data);
}

function showDetails(detail) {
  poster.innerHTML = `
    <img src="${IMG_PATH + detail.poster_path}" alt="" />
    <h4>${detail.name}</h4>
    <span>${detail.first_air_date}</span>
  `;
  details.innerHTML = `
    <h3>Overview</h3>
    <p>
        ${detail.overview}
    </p>
    <h5>Additional Details</h5>
    <p><span>Genres:</span> ${detail.genres}</p>
    <p><span>Type:</span> ${detail.type}</p>
    <p><span>Number Of Season:</span> ${detail.number_of_seasons}</p>
    <p><span>Number Of Episodes:</span> ${detail.number_of_episodes}</p>
    <p><span>Ratings:</span> ${detail.vote_average}</p>
  `;
}

getSimilar(SIMILAR_API);

async function getSimilar(url) {
  const res = await fetch(url);
  const data = await res.json();

  showSimilar(data.results);
}

function showSimilar(similars) {
  similarGallery.innerHTML = "";

  similars.forEach((similar) => {
    const {
      name,
      original_name,
      overview,
      first_air_date,
      poster_path,
      id,
      vote_average,
    } = similar;

    const similarElement = document.createElement("div");
    similarElement.classList.add("similar-item");

    similarElement.innerHTML = `
      <div class="img-area">
      <img src="${IMG_PATH + poster_path}" alt="${
      name || original_name
    }" class="img-link" id="${id}">
      </div>
      <div class= "container">
      <p class = "first-para">${name || original_name}</p>
      <p class = "second-para">${first_air_date}</p>
        </div>
      `;

    similarGallery.appendChild(similarElement);

    let newDiv = document.querySelectorAll(".similar-item");
    const newDynamicDivs = Array.from(newDiv);

    newDynamicDivs.forEach((newDivs) => {
      newDivs.addEventListener("click", showSeriesDetails);
    });
  });
}

getRecommend(RECOMMEND_API);

async function getRecommend(url) {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
  showRecommend(data.results);
}

function showRecommend(recommends) {
  recommendGallery.innerHTML = "";

  recommends.forEach((recommend) => {
    const {
      name,
      original_name,
      overview,
      first_air_date,
      poster_path,
      id,
      vote_average,
    } = recommend;

    const recommendElement = document.createElement("div");
    recommendElement.classList.add("recommend-item");

    recommendElement.innerHTML = `
      <div class="img-area">
      <img src="${IMG_PATH + poster_path}" alt="${
      name || original_name
    }" class="img-link" id="${id}">
      </div>
      <div class= "container">
      <p class = "first-para">${name || original_name}</p>
      <p class = "second-para">${first_air_date}</p>
        </div>
      `;

    recommendGallery.appendChild(recommendElement);

    let newDiv = document.querySelectorAll(".recommend-item");
    const newDynamicDivs = Array.from(newDiv);

    newDynamicDivs.forEach((newDivs) => {
      newDivs.addEventListener("click", showSeriesDetails);
    });
  });
}

function showSeriesDetails(event) {
  // Get Movie Id
  let divClicked = event.target.id;

  const seriesId = divClicked;
  window.location.href = "./series-details.html?id=" + seriesId;
}

getVideos(VIDEO_API);

async function getVideos(url) {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.results);
  showTrailer(data.results);
}

const seriesTrailer = document.querySelector(".series-trailer");

function showTrailer(trailers) {
  trailers.forEach((trailer) => {
    if (trailer.type === "Trailer") {
      console.log(trailer.name, trailer.key, trailer.type);

      const trailerElement = document.createElement("iframe");
      trailerElement.setAttribute("height", "315");
      trailerElement.setAttribute("width", "400");
      trailerElement.setAttribute("frameborder", "0");
      trailerElement.setAttribute("allow", "accelerometer");
      trailerElement.setAttribute("allow", "encrypted-media");
      trailerElement.setAttribute("allow", "autoplay");
      trailerElement.setAttribute("allow", "gyroscope");
      trailerElement.setAttribute("allow", "picture-in-picture");
      //   trailerElement.setAttribute(allowfullscreen);
      trailerElement.setAttribute(
        "src",
        "https://www.youtube.com/embed/" + trailer.key
      );

      seriesTrailer.appendChild(trailerElement);
    }
  });
}
