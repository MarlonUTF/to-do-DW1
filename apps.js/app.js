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
            <li class="flex items-center justify-between border-2 border-gray-500 rounded-xl p-2 gap-2">
              <div class="flex items-center gap-2">
                <img src="/recursos/img/checkBoxVazia.svg">
                <div class="item truncate max-w-xs">${item}</div>
              </div>
              <div class="flex items-center gap-2">
                <img class="editar w-6 h-6 cursor-pointer" data-index="${index}" src="/recursos/img/editar.svg" alt="Editar">
                <img class="delete w-6 h-6 cursor-pointer" data-index="${index}" src="/recursos/img/deletar.svg" alt="Deletar">
              </div>
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
