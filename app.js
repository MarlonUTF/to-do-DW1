let list = [2,12,212,213]
let idbutton = document.querySelector("#button")
let idinput = document.querySelector("#input")
let classSaida = document.querySelector(".saida")

idbutton.addEventListener("click", adiciona)

function adiciona(){
    let x = (idinput.value)
    list += x
    //classSaida.innerText = (list) 
    document.querySelector("#list").innerHTML = list.map(item => `<li>${item}</li>`).join('')
}
