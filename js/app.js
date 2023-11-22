
let lista = [];

function manejarCheck(index) {
  lista[index].marcado = !lista[index].marcado;
console.log(lista[index].marcado)
}

function listadoCompu() {

  const listadoPC = document.getElementById("listadoPC");
  listadoPC.innerHTML="";
  lista.forEach((element, index) => {
    listadoPC.innerHTML += `
        <td>
        <span ">
          ${index+1}
        </span>
      </td>
      <td>
        <span)">
         ${element.numeropc} 
        </span>
      </td>
      <td>
        <span">
          ${element.Problema}
        </span>
      </td>
      <td>
      <input type="checkbox" id="checka" onchange="manejarCheck(${index})"class="checkboxPersonalizado" ${
    lista.marcado ? "checked" : ""
  }</td>
    `;
  });
}
function manejarFormulario(event) {
  event.preventDefault();
  const Npc = document.getElementById("Numeropc");
  const Problema = document.getElementById("Problema");
  
   let createFicha= {
      numeropc: Npc.value,
      Problema: Problema.value,
      marcado: false,
    };
    lista.push(createFicha)
  
    listadoCompu()

}
