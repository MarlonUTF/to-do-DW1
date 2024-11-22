const themeToggle = document.querySelector(".modo");
const themeIcon = document.querySelector("#theme-icon");

// Verifica a preferência do tema no localStorage ao carregar a página
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  themeIcon.src = "recursos/img/darkMode.svg";
} else {
  themeIcon.src = "recursos/img/lightMode.svg";
}

themeToggle.addEventListener("click", () => {
  // Alterna a classe 'dark' no HTML
  document.documentElement.classList.toggle("dark");

  // Atualiza o ícone e salva a preferência no localStorage
  if (document.documentElement.classList.contains("dark")) {
    themeIcon.src = "recursos/img/darkMode.svg";
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.src = "recursos/img/lightMode.svg";
    localStorage.setItem("theme", "light");
  }
});
