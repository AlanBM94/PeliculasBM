import {apiKey, objBusqueda} from '../base';
export default class BusquedaSlider{
    constructor(){
        this.imagenes = [],
        this.info = objBusqueda();
    }
    fecha(){
        const fecha = new Date();
        const fechaObj = {
            año: fecha.getFullYear(),
            mes: fecha.getMonth(),
            dia: fecha.getDate()
        }
        this.fecha = fechaObj;
    }
    async busquedaActualmenteCines(){
        const url = `${this.info.urlBase}discover/movie?api_key=${apiKey}&primary_release_date.gte=${this.fecha.año}-${this.fecha.mes}-${this.fecha.dia}${this.info.lenguaje}`;
        const resultado = await fetch(url)
            .then(function(response){
                return response.json();
            });
        this.actualmente = resultado.results.splice(0, 5);
    }
    async busquedaImagen(id){
        const url = `${this.info.urlBase}movie/${id}/images?api_key=${apiKey}&language=en-US&include_image_language=en%2Cnull`;
        const resultado = await fetch(url)
            .then(function(response){
                return response.json();
            });
        this.imagenes.push(resultado.posters[0]);
    }

    async busquedaProximosEstrenos(){
        this.fecha.mes = this.fecha.mes + 2;
        const url = `${this.info.urlBase}discover/movie?api_key=${apiKey}&primary_release_date.gte=${this.fecha.año}-${this.fecha.mes}-${this.fecha.dia}${this.info.lenguaje}`;
        const resultado = await fetch(url)
            .then(function(response){
                return response.json();
            });
        this.proximos = resultado.results.splice(0, 5);
        
    }

}