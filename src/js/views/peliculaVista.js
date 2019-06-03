import {domElements} from '../base';
import * as popUp from './popUp';

// Obtiene el valor del input de la película
export const obtenerInput = () => domElements.inputPelicula.value;

// Limpia el input de la busqueda
export const limpiarInput = () => document.querySelector('.formulario__inputPelicula').value = '';


// Muestra en el DOM el resultado de la película
export const mostrarPelicula = (pelicula, cast, director, generos, imagenesCast)=> {
    domElements.peliculaContenedor.innerHTML = '';
    const markup = `
    <div class="peliculaFavorita__info--primaria">
        <img src="${popUp.imagen(pelicula)}" alt="">
        <h4>${pelicula.title}</h4>
    </div> 
    <div class="peliculaFavorita__info--secundaria">
        <div class="peliculaFavorita__sinopsis">
            <h4 class="infoSecundariaTitulo">Sinopsis</h4>
            <p class="contenido">${popUp.descripcion(pelicula)}</p>
        </div>
        <div class="peliculaFavorita__reparto">
            <h4 class="infoSecundariaTitulo">Reparto</h4>
            <ul class="popUp__lista popUp__lista--pelicula">
                ${cast.map((actor, indice)=> {
                    return `<li>
                        <img src="${imagenesCast[indice]}" alt="">
                        <p class="contenido">${actor.name}</p>
                    </li>`
                })};
            </ul>  
        </div>
        <div class="peliculaFavorita__duracion">
            <h4 class="infoSecundariaTitulo">Director</h4>
            <img src="${popUp.imagenDirector(director)}" alt="${director.name}">
            <p class="contenido">${director.name}</p>>
        </div>
        <div class="peliculaFavorita__genero">
            <h4 class="infoSecundariaTitulo">Género(s)</h4>
            <p class="contenido">${generos.join(', ')}.</p>
        </div>

        <button class="bTn bTn--favorita">Ver trailer</button> 
    </div> 
    `;
    domElements.peliculaContenedor.insertAdjacentHTML('beforeend', markup);
    
};
// Muestra el spinner
export const mostrarSpinner = () => {
    const markup = `
        <div class="spinner spinner--blanco spinner--blanco--2">
            <svg class="spinner__icono spinner__icono--blanco spinner__icono--blanco--2">
                <use xlink:href="img/symbol-defs.svg#icon-loop2"></svg>
            </svg>
        </div>
    `;
    domElements.peliculaContenedor.insertAdjacentHTML('beforeend', markup);
};

// Limpia el spinner 
export const limpiarSpinner = () => {
    const spinner = document.querySelector('.spinner--blanco .spinner__icono--blanco');
    if(spinner) spinner.parentElement.removeChild(spinner);
};