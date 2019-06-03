import {domElements, formatoFecha, mostrarBotonesPaginacion, objBusqueda} from '../base';
// import { mostrarPelicula } from './peliculaVista';

// Limpia el resultado de la paginación
export const limpiaPaginacion = () => {
    domElements.mejoresPeliculasContenedor.innerHTML = '';
    domElements.paginacionContenedor.innerHTML = '';
}

// Obtiene el género que se buscó
export const obtenerGenero = () => domElements.opcionesMejoresPeliculas.value;

// Muestra el título del género buscado
export const muestraTitulo = genero => {
    domElements.mejoresPeliculasTitulo.textContent = genero;
};

// Muestra una película en el DOM
const muestraPelicula = pelicula => {
    let info = objBusqueda();
    const markup = `
    <li class="mejoresPeliculas__listaItem">
        <img src="${info.urlImagen}${pelicula.backdrop_path}" alt="${pelicula.title}">
        <h5>${pelicula.title}</h5>
        <p>${formatoFecha(pelicula.release_date)}</p>
        <div>
            <a href="#" class="mejoresPeliculas__trailer">
                <svg>
                    <use xlink:href="./img/symbol-defs.svg#icon-triangle-right"></use>
                </svg>
            </a>
            <a href="#" class="mejoresPeliculas__favorito">
                <svg>
                <use xlink:href="./img/symbol-defs.svg#icon-heart"></use>
                </svg>
            </a>
        </div>
    </li>
    `;
    domElements.mejoresPeliculasContenedor.insertAdjacentHTML('beforeend', markup);
};



// Muestra todas las películas en el DOM con la paginación
export const mostrarResultados = (peliculas, pagina = 1, resultadosPorPagina = 4)=> {
    const inicio = (pagina - 1) * resultadosPorPagina;
    const final = pagina * resultadosPorPagina;
    peliculas.slice(inicio, final).forEach(muestraPelicula);
    mostrarBotonesPaginacion(pagina, peliculas.length, resultadosPorPagina, 'mejoresPeliculas');
};