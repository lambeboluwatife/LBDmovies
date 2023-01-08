const types = document.querySelectorAll(".types");
const movie = document.querySelector(".movie");
const series = document.querySelector(".series");

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
  movie.style.display = "none";
  series.style.display = "block";
});

types[0].addEventListener("click", () => {
  movie.style.display = "block";
  series.style.display = "none";
});

let pictureSize;
// const height = screen.height;
const width = screen.width;

if (width >= 0 && width <= 1023) {
  pictureSize = "w185";
} else if (width === 1024 || width > 1024) {
  pictureSize = "w500";
}

const movieGallery = document.querySelector(".movie-gallery");
const seriesGallery = document.querySelector(".series-gallery");

const form = document.getElementById("form");
const search = document.getElementById("search");

const MOVIE_API =
  "https://api.themoviedb.org/3/trending/movie/day?api_key=514318c6f6f673457a51ffcaf8158cf2";

const img_path = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=514318c6f6f673457a51ffcaf8158cf2&query="';

const TV_API =
  "https://api.themoviedb.org/3/trending/tv/day?api_key=514318c6f6f673457a51ffcaf8158cf2";

getMovies(MOVIE_API);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  movieGallery.innerHTML = "";

  movies.forEach((movie) => {
    const {
      title,
      original_name,
      release_date,
      overview,
      media_type,
      first_air_date,
      poster_path,
      vote_average,
      id,
    } = movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-item");

    movieElement.innerHTML = `
    <div class="img-area">
        <img src="http://image.tmdb.org/t/p/w500/${poster_path}" alt="" class="img-link" id="${id}">
        </div>
        <div class= "container">
        <p class = "first-para">${title || original_name}</p>
        <p class = "second-para">${release_date || first_air_date}</p>
    </div>
    `;

    movieGallery.appendChild(movieElement);

    let newDiv = document.querySelectorAll(".movie-item");
    const newDynamicDivs = Array.from(newDiv);

    newDynamicDivs.forEach((newDivs) => {
      newDivs.addEventListener("click", showMovieDetails);
    });
  });
}

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const searchTerm = search.value;

//   if (searchTerm && searchTerm !== "") {
//     getMovies(SEARCH_API + searchTerm);

//     search.value = "";
//   } else {
//     window.location.reload();
//   }
// });

getTvShows(TV_API);

async function getTvShows(url) {
  const res = await fetch(url);
  const data = await res.json();

  showTvShows(data.results);
}

function showTvShows(shows) {
  seriesGallery.innerHTML = "";

  shows.forEach((show) => {
    const {
      name,
      original_name,
      overview,
      first_air_date,
      poster_path,
      id,
      vote_average,
    } = show;

    const seriesElement = document.createElement("div");
    seriesElement.classList.add("series-item");

    seriesElement.innerHTML = `
    <div class="img-area">
        <img src="http://image.tmdb.org/t/p/w500/${poster_path}" alt="" class="img-link" id="${id}">
        </div>
        <div class= "container">
        <p class = "first-para">${name || original_name}</p>
        <p class = "second-para">${first_air_date}</p>
    </div>
    `;

    seriesGallery.appendChild(seriesElement);

    let newDiv = document.querySelectorAll(".series-item");
    const newDynamicDivs = Array.from(newDiv);

    newDynamicDivs.forEach((newDivs) => {
      newDivs.addEventListener("click", showSeriesDetails);
    });
  });
}

function showSeriesDetails(event) {
  // Get Movie Id
  let divClicked = event.target.id;

  const movieId = divClicked;
  window.location.href = "./series-details.html?id=" + movieId;
}

function showMovieDetails(event) {
  // Get Movie Id
  let divClicked = event.target.id;

  const movieId = divClicked;
  window.location.href = "./movie-details.html?id=" + movieId;
}
