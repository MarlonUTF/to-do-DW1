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
    
    const closeModalButton = document.querySelector("#close-modal");
    const aluno = document.querySelector(".modal-title");
    const modal = document.querySelector("#modal");
    const dw = document.querySelector("#DW");
    let numero = document.querySelectorAll("a").forEach((a) => { a.style.color = "black" });
    let nome = document.querySelectorAll(".profile-name").forEach((a) => { a.style.color = "black" });
    dw.style.color = "black";
    closeModalButton.style.fill = "black";
    aluno.style.color = "black";
    modal.style.backgroundColor = "white";

  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.src = "recursos/img/darkMode.svg"; // Ícone para o modo escuro
    localStorage.setItem("theme", "dark");

    const closeModalButton = document.querySelector("#close-modal");
    const aluno = document.querySelector(".modal-title");
    const modal = document.querySelector("#modal");
    const dw = document.querySelector("#DW");
    let numero = document.querySelectorAll("a").forEach((a) => { a.style.color = "white" });
    let nome = document.querySelectorAll(".profile-name").forEach((a) => { a.style.color = "white" });
    dw.style.color = "#ffffff";
    closeModalButton.style.fill = "#ffffff";
    aluno.style.color = "#ffffff";
    modal.style.backgroundColor = "#000000";
  }
});
