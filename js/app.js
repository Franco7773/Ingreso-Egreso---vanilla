//  Variables
const PRESUPUESTO = prompt('¿Cuál es tu presupuesto Semanal?'),
      FORMULARIO = document.getElementById('agregar-gasto');
let CantidadPresupuesto; 

// Class
class Presupuesto { // Clase de presupuesto
  constructor(presupuesto) {
    
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
  }

  presupuestoRestante(cantidad = 0) { // Metodo para ir restando del presupuesto actual.

    return this.restante -= Number(cantidad); 
  }
}
// Clase de interfaz que maneja todo lo relacionado al HTML
class Interfaz {
  insertarPresupuesto(cantidad) {

    let presupuestoSpan = document.querySelector('span#total'),
        restanteSpan = document.querySelector('span#restante');
    // Insertar al HTML
    presupuestoSpan.innerHTML = `${cantidad}`;      
    restanteSpan.innerHTML = `${cantidad}`;      
  }

  imprimirMensaje(mensaje, tipo) {

    let divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert');

    if (tipo === 'error') {

      divMensaje.classList.add('alert-danger');
    } else {

      divMensaje.classList.add('alert-success');
    }
    divMensaje.appendChild(document.createTextNode(mensaje));
    // Insertar en el DOM
    document.querySelector('.primario').insertBefore(divMensaje, FORMULARIO);
    // Quitar el alert
    setTimeout(() => {
      document.querySelector('.primario .alert').remove();
      FORMULARIO.reset();
    }, 3000);
  }
  // Inserta los gastos a la lsita
  agregarGastoListado(nombre, cantidad) {

    let gastosListado = document.querySelector('#gastos ul');
    // Crear un li
    let li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    // Insertar gasto
    li.innerHTML = `
      ${nombre}
      <span class="badge badge-primary badge-pill"> ${cantidad} </span>
      `;
    // Insertar al HTML
    gastosListado.appendChild(li);
  }
  // Comprueba el presupuesto restante
  presupuestoRestante(cantidad) {
    
    let restante = document.querySelector('span#restante');
    // Leemos el presupuesto restante
    let presupuestoRestanteUsuario = CantidadPresupuesto.presupuestoRestante(cantidad);

    restante.innerHTML = `${presupuestoRestanteUsuario}`;

    this.comprobarPresupuesto();
  }
  // Cambiar de color el presupuesto restante
  comprobarPresupuesto() {
    
    let presupuestoTotal = CantidadPresupuesto.presupuesto;
    let presupuestoRestante = CantidadPresupuesto.restante;

    // comprobar 25% del gasto
    if ((presupuestoTotal / 4) > presupuestoRestante) {

      let restante = document.querySelector('.restante');
      restante.classList.remove('alert-success', 'alert-warning');
      restante.classList.add('alert-danger');
    } else if ((presupuestoTotal / 2) > presupuestoRestante) {
      
      let restante = document.querySelector('.restante');
      restante.classList.remove('alert-success', 'alert-danger');
      restante.classList.add('alert-warning');
    }
  }
}


// EventListeners
document.addEventListener('DOMContentLoaded', () => {

  if (PRESUPUESTO === 'null' || PRESUPUESTO === '') {

    window.location.reload();
  } else {
// Insertar Presupuesto
    CantidadPresupuesto = new Presupuesto(PRESUPUESTO);
// Instanciar la clase de Interfaz
    let Ui = new Interfaz();
    Ui.insertarPresupuesto(CantidadPresupuesto.presupuesto); 
  }
})

FORMULARIO.addEventListener('submit', e => {
  
    e.preventDefault();
    // Leer del FORMULARIO de Gastos.
    let nombreGasto = document.querySelector('#gasto').value,
        cantidadGasto = document.querySelector('#cantidad').value;
    // Instanciar la Interfaz
    let Ui = new Interfaz();
    // comprobar que los campos no esten vacios
    if (nombreGasto === '' || cantidadGasto === '') {

      Ui.imprimirMensaje('Hubo un error', 'error');
    } else {
      // Insertar en el HTML
      Ui.imprimirMensaje('Correcto', 'correcto');
      Ui.agregarGastoListado(nombreGasto, cantidadGasto);
      Ui.presupuestoRestante(cantidadGasto);
    }
});
