// Elementos del DOM
export const domElements = {
    carouselInnerActualmente: document.querySelector('.carousel-inner'),
    carouselInnerProximosEstrenos: document.querySelector('.carousel-inner--2'),
    inputActor1: document.querySelector('.formulario__actor--1'),
    inputActor2: document.querySelector('.formulario__actor--2'),
    actorContenedor1: document.querySelector('.actoresJuntosPelicula__resultadoActor--1'),
    actorContenedor2: document.querySelector('.actoresJuntosPelicula__resultadoActor--2'),
    btnPeliculaActores: document.querySelector('.bTn--info-b'),
    peliculasActoresContenedor: document.querySelector('.actoresJuntosPelicula__peliculaContenido ul'),
    inputPelicula: document.querySelector('.formulario__inputPelicula'),
    peliculaContenedor: document.querySelector('.peliculaFavorita__info'),
    formularioMejoresPeliculas: document.querySelector('.formulario__mejoresPeliculas'),
    opcionesMejoresPeliculas: document.querySelector('.formulario__select'),
    mejoresPeliculasContenedor: document.querySelector('.mejoresPeliculas__lista'),
    mejoresPeliculasTitulo: document.querySelector('.titulo--pq--mp'),
    paginacionContenedor: document.querySelector('.mejoresPeliculas__paginacion'),
    paginacionContenedorPeliculasActores: document.querySelector('.actoresJuntosPelicula__contenedorPaginacion'),
    botonBuscarPeliculaActualmente: document.querySelector('.bTn--buscarPelicula--Actualmente'),
    botonBuscarPeliculasProximamente: document.querySelector('.bTn--proximos'),
    popUpContenedor: document.querySelector('.popUp'),
    likesContenedor: document.querySelector('.header__likesList'),
    menuItems: Array.from(document.querySelectorAll('.header__navListaItem')),
    menuBtn: document.querySelector('.header__menubTn')

};

// Objeto de busqueda
export const objBusqueda = () => {
    let obj = {
        urlBase: 'https://api.themoviedb.org/3/',
        lenguaje: '&language=es',
        urlImagen: 'https://image.tmdb.org/t/p/w500/'
    };
    return obj;
};

// La Api Key de The movie database API
export const apiKey = '7b3f963efe6ed502d836ca458c94eab2';


// Le da formato a la fecha 
export const formatoFecha = (fecha) => {
    let mes, dia, año;
    año = fecha.split('-').splice(0, 1);
    const mesDia = fecha.slice(5).split('-');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    mesDia[1].split('')[0] == 0 ? dia = +mesDia[1].split('').splice(1, 1) : dia = mesDia[1];
    mes = meses[parseInt(mesDia[0]) - 1];
    return `${dia} de ${mes} del ${año}`;
};


// ----------------Paginación-------------

// Crea el boton de la paginación
export const crearBotonPaginacion = (pagina, tipo) => `
    <div class="mejoresPeliculas__paginacion--${tipo === 'anterior' ? 'izquierda' : 'derecha'}" >
    <a class="mejoresPeliculas__bTn" data-goto=${tipo === 'anterior' ? pagina - 1 : pagina + 1}>
            <span>Pagina ${tipo === 'anterior' ? pagina - 1 : pagina + 1}</span>
            <svg>
                <use xlink:href="./img/symbol-defs.svg#icon-chevron-thin-${tipo === 'anterior' ? 'left' : 'right'}"></use>
            </svg> 
        </a>
    </div>
`;

// Muestra los botones de la paginación
export const mostrarBotonesPaginacion = (pagina, totalResultado, resultadosPorPagina, paginacion) => {
    const paginas = Math.ceil(totalResultado / resultadosPorPagina);
    let boton;
    if(pagina === 1 && paginas > 1){
        boton = crearBotonPaginacion(pagina, 'siguiente');
    }else if(pagina < paginas){
        boton = `
        ${crearBotonPaginacion(pagina, 'anterior')}
        ${crearBotonPaginacion(pagina, 'siguiente')}
        `;
    }else if (pagina == paginas && paginas > 1){
        boton = crearBotonPaginacion(pagina, 'anterior');
    }else {
        boton = '<p>Única página</p>'
    }
    paginacion == 'mejoresPeliculas' ? domElements.paginacionContenedor.insertAdjacentHTML('afterbegin', boton) : domElements.paginacionContenedorPeliculasActores.insertAdjacentHTML('afterbegin', boton);
};

// Activar y desactivar boton 
export const toggleMenu = (btn) => {
    if(btn % 2 !== 0){
        document.querySelector('.header__navListaContenedor').style.visibility = 'visible';
        document.querySelector('.header__navListaContenedor').style.opacity = '1';
        document.querySelector('.header__navListaContenedor').style.transform = 'translateY(0%)';
    }else{
        document.querySelector('.header__navListaContenedor').style.visibility = 'hidden';
        document.querySelector('.header__navListaContenedor').style.opacity = '0';
        document.querySelector('.header__navListaContenedor').style.transform = 'translateY(-100%)';
    }
};

// Oculta el menú
export const ocultarMenu = () => {
    document.querySelector('.header__navListaContenedor').style.visibility = 'hidden';
    document.querySelector('.header__navListaContenedor').style.opacity = '0';
    document.querySelector('.header__navListaContenedor').style.transform = 'translateY(-100%)';
};

// Manda a yt para ver el trailer 
export const verTrailer = (target) => {
    if(target.classList.contains("popUp__bTn")){
        const nombrePelicula = target.parentElement.children[2].innerText;
        open(`https://www.youtube.com/results?search_query=${nombrePelicula}+trailer`);
    }else{
        const nombrePelicula = target.parentElement.parentElement.children[0].children[1].innerText;
        open(`https://www.youtube.com/results?search_query=${nombrePelicula}+trailer`);
    }
}








