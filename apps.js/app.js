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

    let id = list.length > 0 ? Math.max(...list.map(item => item.id)) + 1 : 1; // Garante o ID único

    let item = {
        id: id,
        tarefa,
        feita: false, // Valor booleano indicando se a tarefa foi concluída
    };
    list.push(item);
    atualizarLista();
    salvarNoLocalStorage(); // Salvar no localStorage sempre que a lista mudar
    idInput.value = "";
}

function atualizarLista() {
    listContainer.innerHTML = list
    .map(
        (item) => {
            // Determina a classe a ser usada (concluída ou pendente)
            const itemClass = item.feita ? 'task-item checked' : 'task-item pending';
            
            return `
    <li class="${itemClass}">
        <div class="divCheck">
            <div>
                <input type="checkbox" name="itens" class="caixa" ${item.feita ? 'checked' : ''} data-id="${item.id}">
            </div>
            <div>${item.tarefa}</div>
        </div>
        <div class="actions">
            <img class="editar" data-id="${item.id}" src="recursos/img/editar.svg" alt="Editar">
            <img class="delete" data-id="${item.id}" src="recursos/img/deletar.svg" alt="Deletar">
        </div>
    </li>`;
        }
    )
    .join("");

    // Eventos de edição, exclusão e checkbox
    document.querySelectorAll(".editar").forEach((button) => {
        button.addEventListener("click", () => edita(button.dataset.id));
    });

    document.querySelectorAll(".delete").forEach((button) => {
        button.addEventListener("click", () => deleta(button.dataset.id));
    });

    document.querySelectorAll(".caixa").forEach((button) => {
        button.addEventListener("click", selecionados);
    });

    selecionados(); // Atualizar o progresso sempre que a lista mudar
}

function edita(id) {
    const index = list.findIndex(item => item.id === parseInt(id)); // Localiza o índice correto
    const listItem = document.querySelectorAll("li")[index];
    listItem.innerHTML = `
        <div class="editNovo">
            <input type="text" id="inputNovo" class="inputNovo" value="${list[index].tarefa}">
            <button id="buttonNovo" class="buttonNovo">Salvar</button>
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

function deleta(id) {
    // Remover item da lista usando o ID único
    list = list.filter(item => item.id !== parseInt(id));
    atualizarLista(); // Re-renderizar a lista
    salvarNoLocalStorage(); // Salvar no localStorage após a exclusão
}

function selecionados() {
    let caixa = document.getElementsByName("itens");
    let concluidas = 0;

    // Atualizar estilização diretamente sem recriar a lista inteira
    list.forEach((item, i) => {
        const li = listContainer.children[i];
        const itemText = li.querySelector("div");  // Seleciona o texto do item
        if (caixa[i].checked) {
            concluidas++;
            item.feita = true; // Atualiza o estado como verdadeiro
            li.classList.add("checked");
            li.classList.remove("pending");
            itemText.style.textDecoration = "line-through";  // Aplica o riscado
        } else {
            item.feita = false; // Atualiza o estado como falso
            li.classList.remove("checked");
            li.classList.add("pending");
            itemText.style.textDecoration = "none";  // Remove o riscado
        }
    });

    // Atualizar a barra de progresso
    progress.innerHTML = `<progress value="${concluidas}" max="${list.length}"></progress> <span id="progressText" class="progress-text">${Math.round((concluidas / list.length) * 100)}%</span>`;

    // Efeito de confete se todas forem concluídas
    if (concluidas === list.length && list.length > 0) {
        jsConfetti.addConfetti();
    }

    salvarNoLocalStorage();
}

function salvarNoLocalStorage() {
    localStorage.setItem("tarefaLista", JSON.stringify(list));
}

function carregarDoLocalStorage() {
    const tarefasSalvas = localStorage.getItem("tarefaLista");
    if (tarefasSalvas) {
        list = JSON.parse(tarefasSalvas);
        // Atualizar a lista após carregar do localStorage
        atualizarLista();
        // Certificar-se de que os checkboxes estejam corretamente marcados
        list.forEach((item, index) => {
            const checkbox = document.querySelectorAll(".caixa")[index];
            if (item.feita) {
                checkbox.checked = true;
                const li = listContainer.children[index];
                const itemText = li.querySelector("div"); // Seleciona o texto do item
                li.classList.add("checked");
                li.classList.remove("pending");
                itemText.style.textDecoration = "line-through"; // Aplica o riscado
            }
        });
    }
}

