let list = [];
let idButton = document.querySelector("#button");
let idInput = document.querySelector("#input");
let listContainer = document.querySelector("#list");

idButton.addEventListener("click", adiciona);

idInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        adiciona();
    }
});

function adiciona() {
    let item = idInput.value.trim();
    if (item) {
        list.push(item);
        atualizarLista();
        idInput.value = "";
    }
}

function atualizarLista() {
    listContainer.innerHTML = list
        .map((item, index) => `
            <li>
                <div class="feito"></div> 
                <div class="item">${item}</div>
                <img class="editar" data-index="${index}" src="/recursos/img/editar.svg">
                <img class="delete" data-index="${index}" src="/recursos/img/deletar.svg">
            </li>
        `)
        .join("");

    // editar e deletar
    document.querySelectorAll(".editar").forEach((button) => {
        button.addEventListener("click", () => edita(button.dataset.index));
    });

    document.querySelectorAll(".delete").forEach((button) => {
        button.addEventListener("click", () => deleta(button.dataset.index));
    });
}

function edita(index) {
    let novoValor = prompt("Digite o novo valor:", list[index]);
    if (novoValor !== null && novoValor.trim() !== "") {
        list[index] = novoValor.trim();
        atualizarLista();
    }
}

function deleta(index) {
    list.splice(index, 1);
    atualizarLista();
}
