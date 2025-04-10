// Variables
const urlPersonajes = 'https://dattebayo-api.onrender.com/characters';
const cardsContainer = document.getElementById('cards-container');
let perPorOagina= 4
const paginas = document.getElementById('pagination');
let personajes = []
let actpagina = 1;


//Obtener personajes
async function obtenerPersonajes() {
    try{
        const response = await fetch(urlPersonajes);
        const res = await response.json();
        personajes = res.characters;
        paginacion(actpagina)
    }catch(error){
        console.log(error);
    }
}