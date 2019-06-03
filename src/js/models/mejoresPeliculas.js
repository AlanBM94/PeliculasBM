import {apiKey, objBusqueda} from '../base';

export default class MejoresPeliculas{
    constructor(generoId){
        this.generoId = generoId;
        this.info = objBusqueda();
    };

    async buscarMejoresPeliculas(){
        const url = `${this.info.urlBase}discover/movie?api_key=${apiKey}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=7&with_genres=${this.generoId}${this.info.lenguaje}`;
        const res = await fetch(url)
            .then(function(response){
                return response.json();
            });
        this.mejores = res.results;  
    };

    async generos(){
        const url = `${this.info.urlBase}genre/movie/list?api_key=${apiKey}${this.info.lenguaje}`;
        const res = await fetch(url)
            .then(function(response){
                return response.json();
        });
        this.generos = res.genres;
    };

    obtenerGeneroBuscado(){
        const posicionGenero = this.generos.findIndex(genero => this.generoId == genero.id);
        this.genero = this.generos[posicionGenero].name;
        console.log(this.genero);
    }
};