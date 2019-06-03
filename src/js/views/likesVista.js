import {domElements, formatoFecha, objBusqueda} from '../base';

const conseguirImagen = peliculaInfo => {
    let imagen;
    let info = objBusqueda();
    if(peliculaInfo.backdrop_path == null){
        imagen = `${info.urlImagen}${peliculaInfo.poster_path}`;
    }
    if(peliculaInfo.backdrop_path == null && peliculaInfo.poster_path == null){
        imagen = `./img/no-imagen.jpg`
    }
    imagen = `${info.urlImagen}${peliculaInfo.backdrop_path}`;
    return imagen;
}

// Muestra la película que fue likeada en el DOM
export const mostrarPeliculaFavorito = pelicula => {
    // Elimina el mensaje de "No tienes ninguna película en favoritos"
    if(domElements.likesContenedor.children[0].innerText == 'No tienes ninguna película en favoritos'){
        domElements.likesContenedor.innerHTML = '';
    }
    const markup = `
        <li class="header__likesItem">
            <img src="${conseguirImagen(pelicula)}" alt="${pelicula.title}">
            <h3>${pelicula.title}</h3>
            <span>${formatoFecha(pelicula.release_date)}</span>
            <div class="header__likesItemIconos">
                <a href="#" class="header__likesItemIconos--1">
                    <svg>
                        <use xlink:href="img/symbol-defs.svg#icon-magnifying-glass"></use>
                    </svg>
                </a>
                <a href="#" class="header__likesItemIconos--2">X</a>
            </div>
        </li>
    `;
    domElements.likesContenedor.insertAdjacentHTML('beforeend', markup);

};

// Elimina la película seleccionada del DOM
export const eliminarPelicula = icono => {
    const contenedorPeliculas = icono.parentElement.parentElement.parentElement;
    const peliculaEliminar = icono.parentElement.parentElement;
    contenedorPeliculas.removeChild(peliculaEliminar);

};