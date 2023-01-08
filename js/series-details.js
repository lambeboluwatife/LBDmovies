//To extract query parameter from page link
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const poster = document.querySelector(".poster");
const details = document.querySelector(".details");

const DETAILS_API =
  "https://api.themoviedb.org/3/tv/" +
  id +
  "?api_key=514318c6f6f673457a51ffcaf8158cf2";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

getDetails(DETAILS_API);

async function getDetails(url) {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data);
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
