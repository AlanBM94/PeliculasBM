const css = require('../sass/main.scss');
import {domElements, toggleMenu, ocultarMenu, verTrailer} from './base';
import BusquedaSlider from './models/busquedaSliders';
import Actor from './models/actores';
import PeliculaActores from './models/peliculaActores';
import MejoresPeliculas from './models/mejoresPeliculas';
import Pelicula from './models/pelicula';
import Likes from './models/likes';
import * as busquedaSliderVista from './views/busquedaSlidersVista';
import * as actoresVista from './views/actoresVista';
import * as peliculaActoresVista from './views/peliculaActoresVista';
import * as peliculaVista from './views/peliculaVista';
import * as mejoresPeliculasVista from './views/mejoresPeliculasVista';
import * as popUp from './views/popUp';
import * as likesVista from './views/likesVista';

//---------------------------Estado de la aplicación--------------------------

let estado = {
    actores: []
};

//---------------------------Controladores--------------------------

// Controlador que muestra las películas actuales
const controladorActualmente = async () => {
    estado.actualmenteCines = new BusquedaSlider();
    // Agrega la fecha a la clase BusquedaActualmente
    estado.actualmenteCines.fecha();
    // Hace la busqueda de las películas que están actualmente en cines
    try{   
    await estado.actualmenteCines.busquedaActualmenteCines(); 
    }catch(error){
        alert('Algo salio mal');  
        console.log(error);
    };
    // Muestra las películas que actualmente estan en los cines 
    const peliculaActiva = estado.actualmenteCines.actualmente.splice(0, 1)[0];
    // Hace la busqueda de la imagen de la película activa
    await estado.actualmenteCines.busquedaImagen(peliculaActiva.id);
    // Hace la busqueda de la imagen del resto de las películas
    try{ 
        await estado.actualmenteCines.busquedaImagen(estado.actualmenteCines.actualmente[0].id);
        await estado.actualmenteCines.busquedaImagen(estado.actualmenteCines.actualmente[1].id);
        await estado.actualmenteCines.busquedaImagen(estado.actualmenteCines.actualmente[2].id);
        await estado.actualmenteCines.busquedaImagen(estado.actualmenteCines.actualmente[3].id);
    }catch(error){
        console.log(error);
    };
    estado.imagenesActualmenteCines = estado.actualmenteCines.imagenes;
    estado.imagenesActualmenteCines = estado.imagenesActualmenteCines.slice(0, 6);
    // Si alguna de las películas no tiene imagen agrega la imagen no-imagen.jpg
    busquedaSliderVista.noFotoSlider(estado.imagenesActualmenteCines);
    
    //Muestra en el DOM la película con la clase active
    busquedaSliderVista.sliderActualmenteItemActivo(peliculaActiva, estado.imagenesActualmenteCines[0].file_path, 'actualmente');
    // Muestra en el DOM las demás películas sin la clase active
    estado.actualmenteCines.actualmente.map((elemento, indice) => {
        if(estado.imagenesActualmenteCines[indice + 1] == './img/no-imagen.jpg'){
            busquedaSliderVista.noFoto(elemento, './img/no-imagen.jpg', 'actualmente');
        }else{
            busquedaSliderVista.sliderActualmenteItem(elemento, estado.imagenesActualmenteCines[indice + 1].file_path, 'actualmente');
        };
    });
   
};
// Controlador que muestra los proximos estrenos
const controladorProximosEstrenos = async () => {
    estado.proximosEstrenos = new BusquedaSlider();
    estado.proximosEstrenos.fecha();
    try{
        await estado.proximosEstrenos.busquedaProximosEstrenos();
    }catch(error){
        console.log(error);
    };
    // Muestra las películas que actualmente estan en los cines 
    const peliculaActiva = estado.proximosEstrenos.proximos.splice(0, 1)[0];
    // Hace la busqueda de la imagen de la película activa
    await estado.proximosEstrenos.busquedaImagen(peliculaActiva.id);
    // Hace la busqueda de la imagen del resto de las películas
    try{ 
        await estado.proximosEstrenos.busquedaImagen(estado.proximosEstrenos.proximos[0].id);
        await estado.proximosEstrenos.busquedaImagen(estado.proximosEstrenos.proximos[1].id);
        await estado.proximosEstrenos.busquedaImagen(estado.proximosEstrenos.proximos[2].id);
        await estado.proximosEstrenos.busquedaImagen(estado.proximosEstrenos.proximos[3].id);
    }catch(error){
        console.log(error);
    };
    estado.imagenesProximamente = estado.proximosEstrenos.imagenes;
    estado.imagenesProximamente = estado.imagenesProximamente.slice(0, 6);
    // Si alguna de las películas no tiene imagen agrega la imagen no-imagen.jpg
    busquedaSliderVista.noFotoSlider(estado.imagenesProximamente);
    
    //Muestra en el DOM la película con la clase active
    busquedaSliderVista.sliderActualmenteItemActivo(peliculaActiva, estado.imagenesProximamente[0].file_path, 'proximamente');
    // Muestra en el DOM las demás películas sin la clase active
    estado.proximosEstrenos.proximos.map((elemento, indice) => {
        if(estado.imagenesProximamente[indice + 1] == './img/no-imagen.jpg'){
            busquedaSliderVista.noFoto(elemento, './img/no-imagen.jpg', 'proximamente');
        }else{
            busquedaSliderVista.sliderActualmenteItem(elemento, estado.imagenesProximamente[indice + 1].file_path, 'proximamente');
        };
    });

};

// Controlador de los Actores

const controladorActor = async num => {
    let valor,
        input;
    // Prepara el DOM para mostrar las películas
    peliculaActoresVista.limpiarResultados();
    peliculaActoresVista.limpiarPaginacion();
    // Obtiene el input del cual se extraerá el valor 
    num == 1 ? valor = actoresVista.valorInputActor(domElements.inputActor1): valor = actoresVista.valorInputActor(domElements.inputActor2);
    // Obtiene el input que se va a limpiar 
    num == 1 ? input = 1 : input = 2;
    // Se hace una instancia del actor que se busco 
    estado.actor = await new Actor(valor);
    // Obtienes el Id del actor
    await estado.actor.busquedaActorId();
    // Se agrega al arreglo de actores el actor actual
    if(estado.actor.id !== undefined) {
        actoresVista.mostrarSpinnerActor(num);
        estado.actores.push(estado.actor);
        // Obtienes la información del actor
        await estado.actor.busquedaActor();
        // Limpia el spinner
        actoresVista.limpiarSpinnerActor();
        // Limpia el input del actor
        actoresVista.limpiarInput(input);
        // Muestra el resultado del Actor
        actoresVista.actorInformacion(estado.actor.informacion, num, estado.actor.idFoto);   
    }; 
};
// Controlador de la película donde hayan salido juntos los actres seleccionados
const controladorPeliculaActores = async () => {
    if(estado.actores.length < 2) {
        alert('Debes de ingresar los dos actores para buscar la película.');
        alert('En cada busqueda de películas debes de ingresar de nuevo los dos actores.');
    }else{
        domElements.btnPeliculaActores.style.display = 'none';
        if(estado.actores[0].id == estado.actores[1].id){
            alert('Tienes que ingresar actores diferentes');
            alert('Tienes que ingresar de nuevo los dos actores');
        }else{
            estado.peliculaActores = new PeliculaActores(estado.actores[0].id, estado.actores[1].id);
            // Muestra el spinner
            peliculaActoresVista.mostrarSpinner();
            await estado.peliculaActores.busquedaPelicula();
            // Borra el spinner
            peliculaActoresVista.limpiarSpinner();
            // Muestra los resultados de las películas
            if(estado.peliculaActores.peliculas[0] !== "No se encontraron resultados"){
                peliculaActoresVista.mostrarResultados(estado.peliculaActores.peliculas);
            }else{
                peliculaActoresVista.sinResultados();
            }
        };
        estado.actores = [];
    };
};

// Controlador de la película
const controladorPelicula = async () => {
    const nombre = peliculaVista.obtenerInput();
    if(nombre !== ''){
        estado.pelicula = new Pelicula(nombre);
        try {
            peliculaVista.limpiarInput();
            peliculaVista.mostrarSpinner();
            await estado.pelicula.busquedaPelicula();
            await estado.pelicula.castPelicula();
            await estado.pelicula.director();
            await estado.pelicula.generos();
            peliculaVista.limpiarSpinner();
            estado.pelicula.obtenerGenerosPelicula();
            let imagenesCast = popUp.castImagenes(estado.pelicula.cast);
            peliculaVista.mostrarPelicula(estado.pelicula.informacion, estado.pelicula.cast, estado.pelicula.director, estado.pelicula.generosPelicula, imagenesCast);
        } catch (error) {
            console.log(error);

        };
        
    };
};

// Controlador de mejores películas
const controladorMejoresPeliculas = async () => {
    const generoId = mejoresPeliculasVista.obtenerGenero();
    // Se crea una instancia de la clase MejoresPeliculas
    estado.mejoresPeliculas = new MejoresPeliculas(generoId);
    // Prepara el DOM para insertar el resultado
    domElements.mejoresPeliculasContenedor.innerHTML = '';
    domElements.mejoresPeliculasTitulo.textContent = '';
    
    try {
        await estado.mejoresPeliculas.buscarMejoresPeliculas();
        await estado.mejoresPeliculas.generos();
        estado.mejoresPeliculas.obtenerGeneroBuscado();
        mejoresPeliculasVista.muestraTitulo(estado.mejoresPeliculas.genero);
        mejoresPeliculasVista.mostrarResultados(estado.mejoresPeliculas.mejores);
    } catch (error) {
        alert('Algo salio mal con tu busqueda');
        console.log(error);
    };
};

// Controlador que muestra la información de la película
const controladorInformacionPelicula = async (e, tipoInfo) => {
    let peliculaActual;
    if(tipoInfo == 'slider'){
        peliculaActual = Array.apply(null, e.childNodes).filter(elemento => elemento.className == 'carousel-item active')[0].childNodes[3].alt;
    }else if(tipoInfo == 'infoPeliculaActores'){
        peliculaActual = e.parentElement.children[1].innerText;
    }else{
        peliculaActual = e.parentElement.parentElement.parentElement.children[1].innerText;
    }
    estado.informacionPelicula = new Pelicula(peliculaActual);
    try {
        await estado.informacionPelicula.busquedaPelicula();
        await estado.informacionPelicula.castPelicula();
        await estado.informacionPelicula.generos();
        await estado.informacionPelicula.obtenerGenerosPelicula();
        await estado.informacionPelicula.director();
        let imagenesCast = popUp.castImagenes(estado.informacionPelicula.cast);
        popUp.mostrarPopUp(estado.informacionPelicula, imagenesCast);
    } catch (error) {
        alert('Algo salio mal');
        console.log(error);
    }
};

// Controlador que agrega una película a favoritos
const controladorLikes = (e) => {
    if(!estado.likes){
        estado.likes = new Likes();
    }
    const nombrePeliculaDOM = e.parentElement.parentElement.parentElement.parentElement.children[1].innerText.split('...')[0];
    // Encuentra la película de el arreglo de estado.mejoresPeliculas.mejores que se quiere agregar a favoritos
    estado.likes.encontrarPelicula(estado.mejoresPeliculas.mejores, nombrePeliculaDOM);
    // Agrega la película seleccionada al arreglo de favoritos
    estado.likes.agregarPelicula(estado.likes.infoPelicula);
    // Muestra la película likeada en el DOM
    likesVista.mostrarPeliculaFavorito(estado.likes.agregarPelicula(estado.likes.infoPelicula));


};


// ------------------------- Event listeners ---------------------------

// Evento que se dispara cuando la pagina es cargada
window.addEventListener('load', () => {
    controladorActualmente();
    controladorProximosEstrenos();
    // Recupera los que se han agregado anteriormente cuando carga la página
    estado.likes = new Likes();
    estado.likes.leerStorage();
    estado.likes.favoritos.map(pelicula => likesVista.mostrarPeliculaFavorito(pelicula));
    estado.btn = 0;
    
});


// Eventos que se dispara cuando el usuario se pone en los inputs de los actores
domElements.formularioActor1.addEventListener('submit', (e) => {
    e.preventDefault();
    controladorActor(1);
});

domElements.formularioActor2.addEventListener('submit', (e) => {
    e.preventDefault();
    controladorActor(2);
});

// Evento que se dispara cuando das click en el boton de buscar película con los dos actorea
domElements.btnPeliculaActores.addEventListener('click', e=> {
    e.preventDefault();
    controladorPeliculaActores();
});

// Evento que se dispara cuando se busca una película
domElements.formularioPeliculaFavorita.addEventListener('submit', (e) => {
    e.preventDefault();
    controladorPelicula();
});

// Evento que se dispara cuando se hace click en el boton de buscar mejores películas
domElements.formularioMejoresPeliculas.addEventListener('submit', e => {
    e.preventDefault();
    mejoresPeliculasVista.limpiaPaginacion();
    controladorMejoresPeliculas();
});

// Eventos que se hacen cuando se da click a un boton de la paginación de las mejores películas
domElements.paginacionContenedor.addEventListener('click', e => {
    const btn = e.target.closest('.mejoresPeliculas__bTn');
    if (btn) {
        const irPagina = parseInt(btn.dataset.goto, 10);
        mejoresPeliculasVista.limpiaPaginacion();
        mejoresPeliculasVista.mostrarResultados(estado.mejoresPeliculas.mejores, irPagina);
    }
});

// Eventos que se hacen cuando se da click a un boton de la paginación de las películas que son coincidencias de los actores
domElements.paginacionContenedorPeliculasActores.addEventListener('click', e => {
    const btn = e.target.closest('.mejoresPeliculas__bTn');
    if (btn) {
        const irPagina = parseInt(btn.dataset.goto, 10);
        peliculaActoresVista.limpiarPaginacion();
        peliculaActoresVista.mostrarResultados(estado.peliculaActores.peliculas, irPagina);
    }
});

// Evento que se dispara cuando se presiona el botón de ver información de películas actualmente
domElements.botonBuscarPeliculaActualmente.addEventListener('click', e => {
    e.preventDefault();
    controladorInformacionPelicula(document.querySelector('.carousel-inner'), 'slider');
})

// Evento que se dispara cuando se presiona el botón de ver información de películas proximamente
domElements.botonBuscarPeliculasProximamente.addEventListener('click', e => {
    e.preventDefault();
    controladorInformacionPelicula(document.querySelector('.carousel-inner--2'), 'slider');
    
});

// Evento que se dispara cuando se hace click en el boton de cerrar popUp
domElements.popUpContenedor.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.matches('.popUp__cerrar')){
        domElements.popUpContenedor.innerHTML = '';
        domElements.popUpContenedor.style.visibility = 'hidden';
    };
});

// Evento que se dispara cuando presionas el boton de ver la información de la película con los actores
document.querySelector('.actoresJuntosPelicula__pelicula').addEventListener('click', e => {
    if(e.target.matches('.bTn--informacion')){
        controladorInformacionPelicula(e.target, 'infoPeliculaActores');
    }
});


// Evento que se dispara cuando se agrega una película a favoritos
document.querySelector('.mejoresPeliculas__contenido--contenido').addEventListener('click', e => {
    e.preventDefault();
   if(e.target.matches('.mejoresPeliculas__favorito svg use')){
       alert('Se ha agregado la película a favoritos');
       controladorLikes(e.target);
   } 
});

// Evento que se dispara cuando de elimina una película de favoritos
document.querySelector('.header__likesPanel').addEventListener('click', e => {
    e.preventDefault();
    if(e.target.matches('.header__likesItemIconos--2')){
        // Se elimina del DOM
        likesVista.eliminarPelicula(e.target);
        // Se elimina del Local storage
        estado.likes.eliminarStorage(e.target);
        // Muestra que no hay ninguna pelicula en favoritos
        if(estado.likes.favoritos.length == 0){
            domElements.likesContenedor.innerHTML = '<p>No tienes ninguna película en favoritos</p>';
        }
    }

});

// Evento que se dispara cuando se hace click en la información de la película likeada
document.querySelector('.header__likesPanel').addEventListener('click', e => {
    e.preventDefault();
    if(e.target.matches('.header__likesItemIconos--1 svg')){
        controladorInformacionPelicula(e.target, 'infoLike');
    }

});

// Evento que se dispara cuando das click en ver trailer popUp
domElements.popUpContenedor.addEventListener('click', (e)=> {
    if(e.target.matches('.popUp__bTn')){
        e.preventDefault();
        verTrailer(e.target);
    }
});

// Evento que se dispara cuando das click en ver trailer pelicula Favorita
document.querySelector('.peliculaFavorita__info').addEventListener('click', (e) =>{
    if(e.target.matches('.bTn--favorita')){
        e.preventDefault();
        verTrailer(e.target);
    }
});

//Evento que se dispara cuando das click en el btn del menú
domElements.menuBtn.addEventListener('click', () => {
    estado.btn++;
    toggleMenu(estado.btn);
    
});

// Evento que se dispara cuando das click en un boton del menu
domElements.menuItems.map(item => {
    item.addEventListener('click', () => {
        estado.btn = 0;
        ocultarMenu();
    });
});











