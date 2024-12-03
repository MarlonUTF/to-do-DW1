let list = [];
let idButton = document.querySelector("#button");
let idInput = document.querySelector("#input");
let listContainer = document.querySelector("#list");
let progress = document.querySelector(".progress");

const jsConfetti = new JSConfetti();

idButton.addEventListener("click", adiciona);

idInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        adiciona();
    }
});

function adiciona() {
    let tarefa = idInput.value.trim();
    if (!tarefa) return; // Não adicionar tarefas vazias

    let item = {
        id: list.length + 1,
        tarefa,
        feita: "",
    };
    list.push(item);
    atualizarLista();
    idInput.value = "";
    selecionados();
}

function atualizarLista() {
    listContainer.innerHTML = list
        .map(
            (item) => `
        <li class="flex items-center justify-between border-2 border-gray-500 rounded-xl p-2 gap-2">
            <div class="flex items-center gap-2">
                <div>
                    <input type="checkbox" name="itens" class="caixa" ${item.feita}>
                </div>
                <div class="item truncate max-w-xs">${item.tarefa}</div>
            </div>
            <div class="flex items-center gap-2">
                <img class="editar w-6 h-6 cursor-pointer" data-index="${item.id}" src="/recursos/img/editar.svg" alt="Editar">
                <img class="delete w-6 h-6 cursor-pointer" data-index="${item.id}" src="/recursos/img/deletar.svg" alt="Deletar">
            </div>
        </li>`
        )
        .join("");

    // Eventos de edição, exclusão e checkbox
    document.querySelectorAll(".editar").forEach((button) => {
        button.addEventListener("click", () => edita(button.dataset.index));
    });

    document.querySelectorAll(".delete").forEach((button) => {
        button.addEventListener("click", () => deleta(button.dataset.index));
    });

    document.querySelectorAll(".caixa").forEach((button, i) => {
        button.addEventListener("click", () => selecionados());
    });

    selecionados(); // Atualizar o progresso sempre que a lista mudar
}

function edita(index) {
    index--; // Ajustar para índice baseado em 0

    const listItem = document.querySelectorAll("li")[index];
    listItem.innerHTML = `
        <div class="flex min-w-max">
            <input type="text" id="inputNovo" class="h-8 grow border-2 border-gray-500 rounded-xl mx-3 p-2 flex items-center" value="${list[index].tarefa}">
            <button id="buttonNovo" class="h-8 flex items-center justify-center bg-green-700 px-6 rounded-xl mr-3">Salvar</button>
        </div>`;

    const inputNovo = document.getElementById("inputNovo");
    inputNovo.focus(); // Focar automaticamente no input
    inputNovo.setSelectionRange(inputNovo.value.length, inputNovo.value.length); // Posicionar o cursor no final

    document.getElementById("buttonNovo").addEventListener("click", () => {
        const novoValor = inputNovo.value.trim();
        if (novoValor) {
            list[index].tarefa = novoValor;
            atualizarLista();
        }
    });

    inputNovo.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const novoValor = event.target.value.trim();
            if (novoValor) {
                list[index].tarefa = novoValor;
                atualizarLista();
            }
        }
    });
}

function deleta(index) {
    index--; // Ajustar índice
    list.splice(index, 1);
    atualizarLista(); // Re-renderizar lista
}

function selecionados() {
    let caixa = document.getElementsByName("itens");
    let concluidas = 0;

    // Contar as tarefas concluídas
    for (let i = 0; i < list.length; i++) {
        if (caixa[i].checked) {
            concluidas++;
            list[i].feita = "checked";
        } else {
            list[i].feita = "";
        }
    }

    // Atualizar a barra de progresso
    progress.innerHTML = `<progress class="dark:bg-gray-700" value="${concluidas}" max="${list.length}"></progress>`;

    // Se todas as tarefas forem concluídas, exibe o efeito de confete
    if (concluidas === list.length && list.length > 0) {
        jsConfetti.addConfetti(); // Chama o efeito de confete
    }
}