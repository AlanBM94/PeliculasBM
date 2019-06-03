import {domElements, objBusqueda} from '../base';
// Obtiene los valores de los inputs de los actores
export const valorInputActor = input => input.value;

// Limpia la busqueda
export const limpiarInput = (val) => val == 1 ? domElements.inputActor1.value = '' : domElements.inputActor2.value = '';

// Formato cumpleaños

const cumpleaños = (fecha) => {
    let mes, dia;
    const cumple = fecha.slice(5).split('-');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    cumple[1].split('')[0] == 0 ? dia = +cumple[1].split('').splice(1, 1) : dia = cumple[1];
    mes = meses[parseInt(cumple[0]) - 1];
    return `${dia} de ${mes}`;
}


// Calcula la edad del actor
const edadActor = (diaNacimiento) => {
    const año = new Date().getFullYear();
    return año - parseInt(diaNacimiento.split('-')[0]);
} 

// Muestra Spinner
export const mostrarSpinnerActor = (tipoSpinner) => {
    const markup = `
        <div class="spinner">
            <svg class="spinner__icono">
                <use xlink:href="img/symbol-defs.svg#icon-loop2"></svg>
            </svg>
        </div>
    `;
    tipoSpinner === 1 ? domElements.actorContenedor1.insertAdjacentHTML('beforeend', markup) :
    domElements.actorContenedor2.insertAdjacentHTML('beforeend', markup);
};

// Limpia el spinner 
export const limpiarSpinnerActor = () => {
    const spinner = document.querySelector('.spinner .spinner__icono');
    if(spinner) spinner.parentElement.removeChild(spinner);
};

// Inserta en el DOM la información de los actores
export const actorInformacion = (actor, num, img) => {
    let markup;
    let info = objBusqueda();
    num == 1 ? domElements.actorContenedor1.innerHTML = '' : domElements.actorContenedor2.innerHTML = '';
    if(actor.birthday == null || actor.place_of_birth == null){
        markup = `
            <img src="${info.urlImagen}${img}" alt="">
            <ul>
                <li><span>Nombre:</span> ${actor.name}</li>
                <li><span>Edad:</span> No fue encontrado ese dato</li>
                <li><span>Lugar de nacimiento:</span> No fue encontrado ese dato</li>
                <li><span>Cumpleaños:</span> No fue encontrado ese dato</li>
            </ul> 
        `;
    }else{
        markup = `
            <img src="${info.urlImagen}${img}" alt="">
            <ul>
                <li><span>Nombre:</span> ${actor.name}</li>
                <li><span>Edad:</span> ${edadActor(actor.birthday)} años</li>
                <li><span>Lugar de nacimiento:</span> ${actor.place_of_birth}</li>
                <li><span>Cumpleaños:</span> ${cumpleaños(actor.birthday)}</li>
            </ul> 
        `;
    };
    num == 1 ? domElements.actorContenedor1.insertAdjacentHTML('beforeend', markup) : domElements.actorContenedor2.insertAdjacentHTML('beforeend', markup);
}