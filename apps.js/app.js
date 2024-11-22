let list = []
let idbutton = document.querySelector("#button")
let idinput = document.querySelector("#input")
let classSaida = document.querySelector(".saida")

idbutton.addEventListener("click", adiciona)

function adiciona() {
    var x = (idinput.value)
    const g = x

    list.push(x);

    //classSaida.innerText = (list) 
    document.querySelector("#list").innerHTML = list.map(item => `
        <li> 
        <div class ="feito"></div> 
        <div class="item">${item} </div>
            <svg class="editar xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
        
            <svg class="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/> <span style="color:transparent" class="span">${g}</span>   </svg>
        </li>`
    ).join('');
    
    // let classSpan = document.querySelector(".span")
    // var j = (classSpan.value)

    document.querySelectorAll(".editar").forEach((button, index) => {
        button.addEventListener("click", () => edita(index));
    });

    document.querySelectorAll(".delete").forEach((button, index) => {
        button.addEventListener("click", () => deleta(index));
    });

}

function deleta() {
    //var tr = document.querySelectorAll(".delete")
    // for(var i=0; i<tr.length; i++){
    //     tr[i].onclick = function(){ 
    //         index = this.rowIndex;
    //         classSaida.innerText = this.rowIndex;
    //     }
    // }

    s = list.length
    for(i=0; i<s; i++){
        if(list[i] == j){
            var index = i
        }
    }

    
    // classSaida.innerText = this.rowIndex

    if (index !== null) {
        // Remove o item da lista pelo índice
        list.splice(index, 1);
    
        // Atualiza a lista no HTML
        document.querySelector("#list").innerHTML = list.map((item, index) => `
            <li> 
                <div class="feito"></div> ${item}
                <svg class="editar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!-- SVG do ícone de editar -->
                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
                </svg>
                
                <svg class="delete" data-index="${index}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <!-- SVG do ícone de deletar -->
                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
            </li>
        `).join('');
        
        // Atualiza os eventos de clique para os botões de deletar novamente
        document.querySelectorAll(".delete").forEach(button => {
            button.addEventListener("click", deleta);
        });
     }
}








// let list = []
// let idbutton = document.querySelector("#button")
// let idinput = document.querySelector("#input")
// let classSaida = document.querySelector(".saida")

// idbutton.addEventListener("click", adiciona)

// function adiciona() {
//     let x = (idinput.value)

//     list.push(x);

//     // Atualiza a lista no HTML
//     document.querySelector("#list").innerHTML = list.map((item, index) => `
//         <li> 
//             <div class="feito"></div> ${item}
//             <svg class="editar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                 <!-- SVG do ícone de editar -->
//                 <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
//             </svg>
            
//             <svg class="delete" data-index="${index}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
//                 <!-- SVG do ícone de deletar -->
//                 <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
//             </svg>
//         </li>
//     `).join('');

//     // Adiciona o evento de clique para todos os botões de deletar
//     document.querySelectorAll(".delete").forEach(button => {
//         button.addEventListener("click", deleta);
//     });
// }

// function deleta() {
//     // Obtém o índice do item a ser deletado a partir do atributo data-index
//     const index = this.rowIndex;

    
//     if (index !== null) {
//         // Remove o item da lista pelo índice
//         list.splice(index, 1);
        
//         // Atualiza a lista no HTML
//         document.querySelector("#list").innerHTML = list.map((item, index) => `
//             <li> 
//                 <div class="feito"></div> ${item}
//                 <svg class="editar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                     <!-- SVG do ícone de editar -->
//                     <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
//                 </svg>
                
//                 <svg class="delete" data-index="${index}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
//                     <!-- SVG do ícone de deletar -->
//                     <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
//                 </svg>
//             </li>
//         `).join('');
        
//         // Atualiza os eventos de clique para os botões de deletar novamente
//         document.querySelectorAll(".delete").forEach(button => {
//             button.addEventListener("click", deleta);
//         });
//     }
// }
