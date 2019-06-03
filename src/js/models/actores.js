import {apiKey, objBusqueda} from '../base';

export default class Actor {
    constructor(nombreActor){
        this.nombreActor = nombreActor;
        this.info = objBusqueda();
    }
    async busquedaActorId(){

        try {
            const url = `${this.info.urlBase}search/person?api_key=${apiKey}&query=${this.nombreActor}`;
            const res = await fetch(url)
                .then(function(response){
                    return response.json();
                });
            this.id = res.results[0].id;
        } catch (error) {
            alert('Ingresa un actor que exista');
            console.log(error);
        }
    }

    async busquedaActor(){
        try {
            const url = `${this.info.urlBase}person/${this.id}?api_key=${apiKey}&language=en-US`
            const res = await fetch(url)
                .then(function(response){
                    return response.json();
                });
            this.informacion = res;
            this.idFoto = this.informacion.profile_path;
        } catch (error) {
            console.log(error);   
        }
    }



}