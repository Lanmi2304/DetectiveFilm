const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b764199e67b4e19a5c1e6edb67298b17&page=1";
const KIDS_URL =
  "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=b764199e67b4e19a5c1e6edb67298b17&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=b764199e67b4e19a5c1e6edb67298b17&query="';
const HIGH_RATE_URL =
  "https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=b764199e67b4e19a5c1e6edb67298b17&page=1";
const form = document.querySelector("#form");
const search = document.querySelector("#search");
const content = document.querySelector(".container");
const modal = document.querySelector(".modal");
const modalWrapper = document.querySelector(".modal-wrapper");
const open_btn = document.querySelector(".open-btn");
const close_btn = document.querySelector(".close-btn");
const nav = document.querySelectorAll(".nav");

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  showMovies(data.results);
  for (let i = 0; i < 4; i++) console.log(data.results[i]);
}
getMovies(HIGH_RATE_URL);
function showMovies(movies) {
  content.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
       <p>${overview}</p>
      </div>
  
   `;

    content.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
open_btn.addEventListener("click", () => {
  nav.forEach((nav_el) => nav_el.classList.add("visible"));
});

close_btn.addEventListener("click", () => {
  nav.forEach((nav_el) => nav_el.classList.remove("visible"));
});

/////////////////
const openModal = () => {
  modal.style.display = "flex";
  modalWrapper.style.display = "flex";
  content.style.opacity = "0.9";
};

const closeModal = () => {
  modal.style.display = "none";
  modalWrapper.style.display = "none";

  let element = document.querySelector(".modal-info");
  element.remove();
};
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", (e) => {
  modalWrapper.innerHTML = "";
  let isMovie = e.target.parentElement.className;
  let movieTitle;
  let imgSrc;
  let description;
  let avgRate;

  ///// PROVERAVAM DA LI JE KLIKNUTA MOVIE KARTICA //////
  if (isMovie == "movie") {
    openModal();
    let clicked = e.target.parentElement; //// KOJI GOD ELEMENT DA KLIKNEM NA KARTICI DAJE MI PARENT ////
    ///////////Prolazak kroz elemente u nizu /////////
    let elements = clicked.childNodes;
    console.log(elements);
    elements.forEach((element) => {
      console.log(element);
      if (element.localName == "img") {
        imgSrc = element.currentSrc;
      }
      if (element.className == "movie-info") {
        movieTitle = element.firstElementChild.innerText;
        let overview = element.nextElementSibling;
        description = overview.lastElementChild.innerText;
        avgRate = element.lastElementChild.innerText;
        console.log(avgRate);
      }
    });

    const movieModal = document.createElement("div");
    movieModal.classList.add("modal-info");
    movieModal.innerHTML = `
    <div class="close-modal">
    <span id="close-icon"> X </span>
    </div>
  <div class="modal-img">
          <img
            src="${imgSrc}"
            alt=""
          />
        </div>
        <div class="modal-movie-info">
          <h2>${movieTitle}</h2>
          <p>
           ${description}
          </p>
          <p class="imdb-rate">IMBd rate: <span class="${getClassByRate(
            avgRate
          )}">${avgRate}
            
          </span></p>
        </div>
        

`;
    modal.appendChild(movieModal);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-modal" || e.target.id === "close-icon") {
    closeModal();
  }
});
/*
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
*/
