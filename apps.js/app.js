let list = [];
let idButton = document.querySelector("#button");
let idInput = document.querySelector("#input");
let listContainer = document.querySelector("#list");
let progress = document.querySelector(".progress")

idButton.addEventListener("click", adiciona);

idInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        adiciona();
    }
});

function adiciona() {
    let item = {
        id: list.length + 1,
        tarefa: idInput.value.trim(),
        feita: "",
    }
    if (item) {
        list.push(item);
        atualizarLista();
        idInput.value = "";
        selecionados();
    }
}

function atualizarLista() {
    listContainer.innerHTML = list.map((item) => `
            <li class="flex items-center justify-between border-2 border-gray-500 rounded-xl p-2 gap-2">
              <div class="flex items-center gap-2">
                <div>
                <input type="checkbox" name ="itens" class="caixa" ${item.feita} >
                </div>
                <div class="item truncate max-w-xs">${item.tarefa}</div>
              </div>
              <div class="flex items-center gap-2">
                <img class="editar w-6 h-6 cursor-pointer" data-index="${item.id}" src="/recursos/img/editar.svg" alt="Editar">
                <img class="delete w-6 h-6 cursor-pointer" data-index="${item.id}" src="/recursos/img/deletar.svg" alt="Deletar">
              </div>
            </li>
        `)
        .join("");

    // editar e deletar e caixa
    document.querySelectorAll(".editar").forEach((button) => {
        button.addEventListener("click", () => edita(button.dataset.index));
    });

    document.querySelectorAll(".delete").forEach((button) => {
        button.addEventListener("click", () => deleta(button.dataset.index));
    });

    document.querySelectorAll(".caixa").forEach((button) => {
        button.addEventListener("click", () => selecionados(button.dataset.index));
    });
}

function edita(index) {
    index--; // Ajustar para o índice correto

    // Criar elementos HTML diretamente no DOM
    const listItem = document.querySelectorAll("li")[index];
    listItem.innerHTML = `
        <div class="flex min-w-max">
            <input type="text" id="inputNovo" class="h-8 grow border-2 border-gray-500 rounded-xl mx-3 p-2 flex items-center" value="">
            <button id="buttonNovo" class="h-8 flex items-center justify-center bg-green-700 px-6 rounded-xl mr-3">Salvar</button>
        </div>`;

    // Adicionar evento ao botão "Salvar"
    document.getElementById("buttonNovo").addEventListener("click", () => {
        const novoValor = document.getElementById("inputNovo").value.trim();
        if (novoValor) {
            list[index].tarefa = novoValor; // Atualizar o valor da tarefa na lista
            atualizarLista(); // Re-renderizar a lista
        }
    });

    // Permitir salvar ao pressionar Enter
    document.getElementById("inputNovo").addEventListener("keypress", (event) => {
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
    index--
    list.splice(index, 1);
    atualizarLista();
    selecionados();
}

function selecionados() {
    let caixa = document.getElementsByName("itens")

    for (i = 0, v = 0; i < list.length; i++) {
        if (caixa[i].checked) {
            v += 1;
            progress.innerHTML = `${v}/${list.length} tarefas concluídas`;
            list[i].feita = "checked";
        } else {
            progress.innerHTML = `${v}/${list.length} tarefas concluídas`;
            list[i].feita = "";
        }
    }
}