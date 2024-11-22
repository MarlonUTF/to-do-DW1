const themeToggle = document.querySelector(".modo");
const themeIcon = document.querySelector("#theme-icon");

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");


  if (document.documentElement.classList.contains("dark")) {
    themeIcon.src = "recursos/img/lua.png";
  } else {
    themeIcon.src = "recursos/img/sol.svg";
  }
});