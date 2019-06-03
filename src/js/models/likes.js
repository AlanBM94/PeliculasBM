
export default class Likes{
    constructor(){
        this.favoritos = [];
    }

    encontrarPelicula(mejoresPeliculas, pelicula){
        this.infoPelicula = mejoresPeliculas[mejoresPeliculas.findIndex(mejorPelicula => mejorPelicula.title == pelicula)]; 
    }
    
    agregarPelicula(infoPelicula){
        // Comprueba que la película no se repita
        if(!this.favoritos.includes(infoPelicula)){
            this.favoritos.push(infoPelicula);
        }
        this.likesStorage();
        return infoPelicula;
    }

    likesStorage(){
        localStorage.setItem('likesPeliculas', JSON.stringify(this.favoritos));
    }

    //Leé el local storage y lo agrega a this.favoritos
    leerStorage() {
        const storage = JSON.parse(localStorage.getItem('likesPeliculas'));
        if (storage) this.favoritos = storage;
    }

    // Elimina las películas de Local Storage
    eliminarStorage(icono){
        const peliculaNombre = icono.parentElement.parentElement.children[1].innerText;
        const indiceEliminar = this.favoritos.findIndex(pelicula => pelicula.title == peliculaNombre);
        this.favoritos.splice(indiceEliminar, 1);
        this.likesStorage();
    }

}