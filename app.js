let list = [2,5,3]
document.getElementById(`list`).innerHTML = list.map(item => `<li>${item}<li>`).join('')