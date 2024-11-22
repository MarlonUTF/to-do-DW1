const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key.toLowerCase() === "h") {
        event.preventDefault();
        toggleModal();
    }
});

const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[closeModalButton, fade].forEach((el) => {
  el.addEventListener("click", () => toggleModal());
});