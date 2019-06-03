import {domElements, objBusqueda} from '../base';
// Info que cambia con cada película

const formatoOverview = overview => overview.slice(0, 32);


//Información de la película que se repite 
const item = (pelicula, imagen)=> {
    let info = objBusqueda();
    const itemMarkup = `
    <div class="carousel-caption d-block">
    <h4 class="imagen-slider-titulo">${pelicula.title}</h4>
    <p class="slider-imagen-parrafo">${formatoOverview(pelicula.overview)}...</p>
    </div>
    <img src="${info.urlImagen}${imagen}" alt="${pelicula.title}" class="imagen-slider">
    `;
    return itemMarkup;
}

//Muestra la película que está activa en el slider
export const sliderActualmenteItemActivo = (pelicula, imagen, tipoSlider)=> {
    const markup = `
    <div class="carousel-item active">
    ${item(pelicula, imagen)}
    </div>
    `;
    tipoSlider == 'actualmente' ? domElements.carouselInnerActualmente.insertAdjacentHTML('beforeend', markup) : domElements.carouselInnerProximosEstrenos.insertAdjacentHTML('beforeend', markup);
    return markup;
}

//Muestra las demás peliculas que no están activas en el slider
export const sliderActualmenteItem = (pelicula, imagen, tipoSlider)=> {
    const markup = `
    <div class="carousel-item">
    ${item(pelicula, imagen)}
    </div>
    `;
    tipoSlider == 'actualmente' ? domElements.carouselInnerActualmente.insertAdjacentHTML('beforeend', markup) : domElements.carouselInnerProximosEstrenos.insertAdjacentHTML('beforeend', markup);
    return markup;
}

// Si alguna de las películas del slider no tiene foto agrega la imagen no-imagen.jpg
export const noFotoSlider = (imagenes) => {
    if(imagenes.includes(undefined)){
        imagenes = imagenes.map(elemento => {
            return elemento == undefined ? elemento = './img/no-imagen.jpg' : elemento;
        });
    };
};

//Muestra la imagen de no-imagen si la película no tiene una imagen
export const noFoto = (pelicula, imagen, tipoSlider) => {
    const itemMarkup = `
    <div class="carousel-item">
        <div class="carousel-caption d-block">
            <h4 class="imagen-slider-titulo">${pelicula.title}</h4>
            <p class="slider-imagen-parrafo">${formatoOverview(pelicula.overview)}...</p>
        </div>
        <img src="${imagen}" alt="" class="imagen-slider">
    </div>
    `;
    tipoSlider == 'actualmente' ? domElements.carouselInnerActualmente.insertAdjacentHTML('beforeend', markup) : domElements.carouselInnerProximosEstrenos.insertAdjacentHTML('beforeend', markup);
    return itemMarkup;
}

