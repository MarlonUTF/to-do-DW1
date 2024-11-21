let list = []
let idbutton = document.querySelector("#button")
let idinput = document.querySelector("#input")
let classSaida = document.querySelector(".saida")

idbutton.addEventListener("click", adiciona)

function adiciona(){
    let x = (idinput.value)

    list.push(x);

    //classSaida.innerText = (list) 
    document.querySelector("#list").innerHTML = list.map(item => `<li>${item}</li>`).join('')
}
