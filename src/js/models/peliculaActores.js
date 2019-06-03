import {apiKey, objBusqueda} from '../base';

export default class PeliculaActores {
    constructor(actor1, actor2){
        this.actor1 = actor1;
        this.actor2 = actor2;
        this.info = objBusqueda();
    }
    async busquedaPelicula(){
        try {
            const url = `${this.info.urlBase}discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_people=${this.actor1},${this.actor2}${this.info.lenguaje}`;
            const res = await fetch(url)
                .then(function(response){
                    return response.json();
                });
            this.peliculas = res.results;
            this.peliculas.length > 0 ? this.peliculas = this.peliculas : this.peliculas = ['No se encontraron resultados'];
        } catch (error) {
            console.log(error);
        }
    }
 
}