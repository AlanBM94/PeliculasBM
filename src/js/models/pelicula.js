import {apiKey, objBusqueda} from '../base';
export default class Pelicula{
    constructor(nombre){
        this.nombre = nombre;
        this.info = objBusqueda();
    }
    async busquedaPelicula(){
        const url = `${this.info.urlBase}search/movie?api_key=${apiKey}&query=${this.nombre}${this.info.lenguaje}`;
        const res = await fetch(url)
            .then(function(response){
                return response.json();
            });
        this.informacion = res.results[0];
        if(this.informacion == undefined) alert('Ingresa una película que exista');
        this.id = this.informacion.id;
        
    }

    
    async castPelicula(){
        const url = `${this.info.urlBase}movie/${this.id}/credits?api_key=${apiKey}${this.info.lenguaje}`;
        const res = await fetch(url)
        .then(function(response){
            return response.json();
        });
        this.crew = res.crew;
        this.cast = res.cast.slice(0, 6);
        
    };
    
    async generos(){
        const url = `${this.info.urlBase}genre/movie/list?api_key=${apiKey}${this.info.lenguaje}`;
        const res = await fetch(url)
            .then(function(response){
                return response.json();
        });
        this.generos = res.genres;
    };

    obtenerGenerosPelicula(){
        this.generosPelicula = [];
        this.informacion.genre_ids.map(generoId => {
            this.generos.map(genero => {
                if(generoId == genero.id) this.generosPelicula.push(genero.name);
            });
        });
    };

    director(){
        this.director = this.crew.filter(persona => {
            if(persona.job == 'Director'){
                return persona;
            };
        })[0];
    };

};