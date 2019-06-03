import {domElements, formatoFecha, mostrarBotonesPaginacion, objBusqueda} from '../base';



// La parte del markup que no es la imagen
const markupInferior = pelicula => {
    return `
        <h4>${pelicula.title}</h4>
        <p>${formatoFecha(pelicula.release_date)}</p>
        <button class="bTn bTn--info-1 bTn--informacion">Ver información</button>
    `;
};
// Limpia la paginación
export const limpiarPaginacion = () => {
    domElements.peliculasActoresContenedor.innerHTML = '';
    domElements.paginacionContenedorPeliculasActores.innerHTML = '';
};

// Activa el botón de buscar y borra el contenido anterior
export const limpiarResultados = () => {
    domElements.btnPeliculaActores.style.display = 'block';
    domElements.peliculasActoresContenedor.innerHTML = '';
};

export const mostrarSpinner = () => {
    const markup = `
        <div class="spinner spinner--blanco">
            <svg class="spinner__icono spinner__icono--blanco">
                <use xlink:href="img/symbol-defs.svg#icon-loop2"></svg>
            </svg>
        </div>
    `;
    domElements.peliculasActoresContenedor.insertAdjacentHTML('beforeend', markup);
};

// Limpia el spinner 
export const limpiarSpinner = () => {
    const spinner = document.querySelector('.spinner--blanco .spinner__icono--blanco');
    if(spinner) spinner.parentElement.removeChild(spinner);
};

// Muestra la película en el DOM
export const mostrarPeliculaActores = pelicula => {
    let info = objBusqueda();
    let imagen, markup;
    pelicula.backdrop_path !== null ? imagen = pelicula.backdrop_path : imagen = pelicula.poster_path;
    if(imagen == null) {
        imagen = './img/no-imagen.jpg';
        markup = `  
        <li>
            <img src="${imagen}" alt="">
            ${markupInferior(pelicula)}
        </li>
    `;
    }else{
        markup = `  
            <li>
                <img src="${info.urlImagen}${imagen}" alt="">
                ${markupInferior(pelicula)};
            </li>
        `
    };
    domElements.peliculasActoresContenedor.insertAdjacentHTML('beforeend', markup);
};

// Muestra que no se encontraron resultados
export const sinResultados = () => {
    domElements.peliculasActoresContenedor.insertAdjacentHTML('beforeend', '<p>No se encontraron resultados</p>');
};

// Muestra los resultados con la paginación
export const mostrarResultados = (peliculas, pagina = 1, resultadosPorPagina = 2)=> {
    const inicio = (pagina - 1) * resultadosPorPagina;
    const final = pagina * resultadosPorPagina;
    peliculas.slice(inicio, final).map(pelicula => mostrarPeliculaActores(pelicula));
    mostrarBotonesPaginacion(pagina, peliculas.length, resultadosPorPagina, 'peliculasActores');
};


