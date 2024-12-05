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

// Carregar a lista do localStorage ao iniciar
carregarDoLocalStorage();

function adiciona() {
    let tarefa = idInput.value.trim();
    if (!tarefa) return; // Não adicionar tarefas vazias

    let item = {
        id: list.length + 1,
        tarefa,
        feita: false, // Valor booleano indicando se a tarefa foi concluída
    };
    list.push(item);
    atualizarLista();
    salvarNoLocalStorage(); // Salvar no localStorage sempre que a lista mudar
    idInput.value = "";
}

function atualizarLista() {
    // listContainer.innerHTML = list
    //     .map((item) =>
    //         item.feita
    //             ? `        
    //     <li class="flex items-center justify-between border-2 border-green-500 bg-green-500 rounded-xl p-2 gap-2">
    //         <div class="flex items-center gap-2">
    //             <div>
    //                 <input type="checkbox" name="itens" class="caixa" checked data-index="${item.id}">
    //             </div>
    //             <div class="item truncate max-w-xs font-bold text-green-800 line-through">${item.tarefa}</div>
    //         </div>
    //         <div class="flex items-center gap-2">
    //             <img class="editar w-6 h-6 cursor-pointer" data-index="${item.id}" src="/recursos/img/editar.svg" alt="Editar">
    //             <img class="delete w-6 h-6 cursor-pointer" data-index="${item.id}" src="/recursos/img/deletar.svg" alt="Deletar">
    //         </div>
    //     </li>`
    //             : `
    //     <li class="flex items-center justify-between border-2 border-gray-500 rounded-xl p-2 gap-2">
    //         <div class="flex items-center gap-2">
    //             <div>
    //                 <input type="checkbox" name="itens" class="caixa" data-index="${item.id}">
    //             </div>
    //             <div class="item truncate max-w-xs">${item.tarefa}</div>
    //         </div>
    //         <div class="flex items-center gap-2">
    //             <img class="editar w-6 h-6 cursor-pointer" data-index="${item.id}" src="/recursos/img/editar.svg" alt="Editar">
    //             <img class="delete w-6 h-6 cursor-pointer" data-index="${item.id}" src="/recursos/img/deletar.svg" alt="Deletar">
    //         </div>
    //     </li>`
    //     )
    //     .join("");

    listContainer.innerHTML = list
    .map(
        (item) => `
    <li class="flex items-center justify-between border-2 border-gray-500 rounded-xl p-2 gap-2">
        <div class="flex items-center gap-2">
            <div>
                <input type="checkbox" name="itens" class="caixa" ${item.feita ? 'checked' : ''}>
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

    document.querySelectorAll(".caixa").forEach((button) => {
        button.addEventListener("click", selecionados);
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
            salvarNoLocalStorage(); // Salvar no localStorage após a edição
        }
    });

    inputNovo.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const novoValor = event.target.value.trim();
            if (novoValor) {
                list[index].tarefa = novoValor;
                atualizarLista();
                salvarNoLocalStorage(); // Salvar no localStorage após a edição
            }
        }
    });
}

function deleta(index) {
    const tarefaId = parseInt(index); // Garantir que o id seja um número
    // Remover item da lista usando o ID único
    list = list.filter(item => item.id !== tarefaId);
    atualizarLista(); // Re-renderizar a lista
    salvarNoLocalStorage(); // Salvar no localStorage após a exclusão
}

function selecionados() {
    let caixa = document.getElementsByName("itens");
    let concluidas = 0;

    // Atualizar estilização diretamente sem recriar a lista inteira
    for (let i = 0; i < list.length; i++) {
        const li = listContainer.children[i];
        const itemText = li.querySelector(".item");  // Seleciona o texto do item
        if (caixa[i].checked) {
            concluidas++;
            list[i].feita = "checked";
            li.classList.add("border-green-500", "bg-green-500");
            li.classList.remove("border-gray-500");
            itemText.style.textDecoration = "line-through";  // Aplica o riscado
        } else {
            list[i].feita = "";
            li.classList.remove("border-green-500", "bg-green-500");
            li.classList.add("border-gray-500");
            itemText.style.textDecoration = "none";  // Remove o riscado
        }
    }

    // Atualizar a barra de progresso
    progress.innerHTML = `<progress class="dark:bg-gray-700" value="${concluidas}" max="${list.length}"></progress>`;

    // Efeito de confete se todas forem concluídas
    if (concluidas === list.length && list.length > 0) {
        jsConfetti.addConfetti();
    }
}

function salvarNoLocalStorage() {
    localStorage.setItem("tarefaLista", JSON.stringify(list));
}

function carregarDoLocalStorage() {
    const tarefasSalvas = localStorage.getItem("tarefaLista");
    if (tarefasSalvas) {
        list = JSON.parse(tarefasSalvas);
        atualizarLista();
    }
}