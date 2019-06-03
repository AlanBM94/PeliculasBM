import {domElements, objBusqueda} from '../base';

// Busca una imagen de la película
export const imagen = (infoImagen) => {
    let imagen;
    let info = objBusqueda();
    if(infoImagen.backdrop_path === null && infoImagen.poster_path === null){
        imagen = './img/no-imagen.jpg';
    }else{
        if(infoImagen.backdrop_path === null){
            imagen = `${info.urlImagen}${infoImagen.poster_path}`;
        }else{
            imagen = `${info.urlImagen}${infoImagen.backdrop_path}`;
        }
    }
    return imagen;
};

// Si la película tiene descripción se le agrega la descripción pero si no se le agrega 'No se encontró ninguna sinopsis'
export const descripcion = (infoDescripcion) => {
    let descripcion;
    infoDescripcion.overview == '' ? descripcion = 'No se encontró ninguna sinopsis' : descripcion = infoDescripcion.overview;
    return descripcion;
};

// Si el director tiene imagen se queda con la imagen pero si no, sele agrega la imagen './img/no-imagen.jpg
export const imagenDirector = (infoImagenDirector) => {
    let imagenDirector;
    let info = objBusqueda();
    infoImagenDirector.profile_path == null ? imagenDirector = './img/no-imagen.jpg' : imagenDirector = `${info.urlImagen}${infoImagenDirector.profile_path}`;
    return imagenDirector;
};

// Si el actor tiene imagen se queda con la imagen pero si no, sele agrega la imagen './img/no-imagen.jpg
export const castImagenes = (cast) => {
    let info = objBusqueda();
    return cast.map(actor => {
        if(actor.profile_path == null){
            return actor.profile_path = './img/no-imagen.jpg';
        }else {
            return actor.profile_path = `${info.urlImagen}${actor.profile_path}`;
        };
    });
};

// Muestra el popUp en el DOM
export const mostrarPopUp = (objetoPelicula, imagenesCast) => {
    const markup = `
    <a href="#" class="popUp__cerrar"></a>
    <img src="${imagen(objetoPelicula.informacion)}" alt="${objetoPelicula.informacion.title}" class="popUp__img">
    <h4 class="popUp__titulo">${objetoPelicula.informacion.title}</h4> 
    <h4 class="popUp__sinopsisTitulo">Sinopsis</h4>
    <p class="popUp__sinopsis">${descripcion(objetoPelicula.informacion)}</p>
    <h4 class="popUp__repartoTitulo">Reparto</h4>
    <ul class="popUp__lista">
        ${objetoPelicula.cast.map((actor, indice)=> {
            return `<li>
                <img src="${imagenesCast[indice]}" alt="">
                <p class="contenido">${actor.name}</p>
            </li>`
        })}
    </ul>    
    <h4 class="popUp__duracionTitulo">Director</h4>
    <p class="popUp__duracion">${objetoPelicula.director.name}</p>
    <img src="${imagenDirector(objetoPelicula.director)}" class="popUp__duracionImagen">
    <h4 class="popUp__generoTitulo">Género(s)</h4>
    <p class="popUp__genero">${objetoPelicula.generosPelicula.join(', ')}</p>
    <button class="popUp__bTn">Ver trailer</button>
    `;
    domElements.popUpContenedor.style.visibility = 'visible';
    domElements.popUpContenedor.insertAdjacentHTML('beforeend', markup);
};