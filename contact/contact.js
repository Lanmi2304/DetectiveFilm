const open_btn = document.querySelector(".open-btn");
const close_btn = document.querySelector(".close-btn");
const nav = document.querySelectorAll(".nav");

open_btn.addEventListener("click", () => {
  nav.forEach((nav_el) => nav_el.classList.add("visible"));
});

close_btn.addEventListener("click", () => {
  nav.forEach((nav_el) => nav_el.classList.remove("visible"));
});

kids.addEventListener("click", (e) => {
  getMovies(KIDS_URL);
});
highestRated.addEventListener("click", (e) => {
  getMovies(HIGH_RATE_URL);
});
popular.addEventListener("click", (e) => {
  getMovies(API_URL);
});
home.addEventListener("click", (e) => {
  window.location.reload();
});
