// CRUD de datos sobre una ED como un array con objetos literales
// que significa CRUD

// (C)reate - agregar un elemento a la ED array - objeto literal
// (R)read - Leer un elemento del array
// (U)pdate - actualizar el objeto dentro del array
// (D)elete - borrar un elemento de la ED (array)
let valor = 0
let alumnos = [];
let seleccionado = -1;
const guardarLS = (elementos) => {
  localStorage.setItem("alumnos", JSON.stringify(elementos));
};

const Siguiente = document.getElementById("siguiente");
const Regresar = document.getElementById("regresar")


function createAlumno(alumno) {
  alumnos.push(alumno);
}

function updateAlumno(index, alumno) {
  alumnos[index] = alumno;
}

function onClickLi(index) {
  seleccionado = index;
  document.getElementById("inputSubmit").value = "Modificar";
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const edad = document.getElementById("edad");
  nombre.value = alumnos[index].nombre;
  apellido.value = alumnos[index].apellido;
  edad.value = alumnos[index].edad;
  controlBotonBorrar(1);
 
}

function manejarCheck(index) {
  alumnos[index].marcado = !alumnos[index].marcado;
console.log(alumnos[index].marcado)

for (let i = alumnos.length -1 ; i >= 0; i--) {  
  if (alumnos[i].marcado === false) {
    controlBotonBorrar(1)
    }else{
      controlBotonBorrar(2)
    }
  }
}

function listadoAlumnos(valor) {

  const listadoAlumnos = document.getElementById("listadoAlumnos");
  listadoAlumnos.innerHTML = "";
    divirArray(alumnos)[valor].forEach((alumno, index) => {
      listadoAlumnos.innerHTML +=
      `
        <li>
          <input type="checkbox" id="checka" onchange="manejarCheck(${index})"class="checkboxPersonalizado" ${
        alumno.marcado ? "checked" : ""
      }>
          <span onclick="onClickLi(${index})">
            ${alumno.apellido}, ${alumno.nombre} - edad: ${alumno.edad}
          </span>
        </li>
      `;
    });
  }
  
 /* alumnos.forEach((alumno, index) => {
    listadoAlumnos.innerHTML += `
      <li>
        <input type="checkbox" id="checka" onchange="manejarCheck(${index})"class="checkboxPersonalizado" ${
      alumno.marcado ? "checked" : ""
    }>
        <span onclick="onClickLi(${index})">
          ${alumno.apellido}, ${alumno.nombre} - edad: ${alumno.edad}
        </span>
      </li>
    `;
  });
}
*/
function manejarFormulario(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const edad = document.getElementById("edad");
  const Borrar = document.getElementById("Borrar");
  if (seleccionado === -1) {
    createAlumno({
      nombre: nombre.value,
      apellido: apellido.value,
      edad: edad.value,
      marcado: false,
    });
    
  } else {
    updateAlumno(seleccionado, {
      nombre: nombre.value,
      apellido: apellido.value,
      edad: edad.value,
      marcado: false,
    });
  }
  seleccionado = -1;
  document.getElementById("inputSubmit").value = "Agregar";
  nombre.value = "";
  apellido.value = "";
  edad.value = "";
  nombre.focus();
  listadoAlumnos(valor);

  /* prueba*/ 
  controlBotonBorrar(2)
  guardarLS(alumnos);
}



function borrarAlumno() {
  for (let i = alumnos.length -1 ; i >= 0; i--) {  
    if (alumnos[i].marcado === true) {
        alumnos.splice(i, 1);
      }
    }
  guardarLS(alumnos)
  listadoAlumnos();
  controlBotonBorrar(1)
}


function  controlBotonBorrar(Num) {
  if (1===Num) {
    Borrar.setAttribute("disabled","")
  }if (2===Num) {
    Borrar.removeAttribute("disabled","")
}
  }

  const cargarLS = () => {
    const ls = JSON.parse(localStorage.getItem("alumnos"));
    if (ls) alumnos = ls;
  };

  cargarLS()
  listadoAlumnos(valor)


  /** PAGINADO
   BTN DISABLED CUANDO NO HAYA NINGUN CHECK
   CHECK DISABLE CUANDO ESTE EL BOTON 
   */

   function SeleccionarTodo(index) {

    const checkboxes = document.querySelectorAll('input[type=checkbox]')
    checkboxes.forEach(checkbox => {
    checkbox.checked = true;
     
    });
    
     for (let i = 0; i < alumnos.length; i++) {
      if (alumnos[i].marcado === false) {
        alumnos[i].marcado= true
      }
    }
    controlBotonBorrar(2);
     }

 
function divirArray(Listado) {
  let DivAlumno= []
  for (let i = 0; i < Listado.length; i+=4) {
      pedacito= Listado.slice(i,i+4);
      DivAlumno.push(pedacito)
    
  }
  return DivAlumno
}

function LargoARRAY() {
let largo = alumnos.length/4
return largo
}



function sumar() {
  let contador= LargoARRAY();
  if (contador === valor){
    valor= LargoARRAY()-1;
    listadoAlumnos(valor)
  }else
  valor= valor + 1
  listadoAlumnos(valor)
  
  
}

function restar() {
  let contador= LargoARRAY();
  if(contador<= valor){
    listadoAlumnos(valor)
    valor= valor - 1;
  }else 
  valor=0
  listadoAlumnos(valor)
}
/* Falta Corregir Paginado con array y que el seleccionar todo sea por lista mostrada y no todo el array*/