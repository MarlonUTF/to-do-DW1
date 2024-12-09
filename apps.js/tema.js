const themeToggle = document.querySelector(".modo");
const themeIcon = document.querySelector("#theme-icon");
const themeSystem = localStorage.getItem('themeSystem') || 'light';


// Verifica a preferência do tema no localStorage ao carregar a página
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeIcon.src = "recursos/img/darkMode.svg"; // Ícone para o modo escuro
  
} else {
  themeIcon.src = "recursos/img/lightMode.svg"; // Ícone para o modo claro
}

themeToggle.addEventListener("click", () => {
  let currentTheme = document.documentElement.getAttribute("data-theme");

  // Alterna o tema
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.src = "recursos/img/lightMode.svg"; // Ícone para o modo claro
    localStorage.setItem("theme", "light");
    
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.src = "recursos/img/darkMode.svg"; // Ícone para o modo escuro
    localStorage.setItem("theme", "dark");
  }
});
