// Variables
const urlPersonajes = 'https://dattebayo-api.onrender.com/characters';
const cardsContainer = document.getElementById('cards-container');
let perPorPagina= 4
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

function paginacion(pagina){
    if (pagina <1 || pagina > 5){
        return;
    }
    currentPage = pagina;
    let start = (pagina - 1) * perPorPagina;
    let end = start + perPorPagina;
    let actPersonajes = personajes.slice(start, end);
    actPersonajes.innerHTML = '';
    actPersonajes.forEach(personaje => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img class="card-image" src="${personaje.images[0]}" alt="">
            <div class="card-content">
                <h2 class="card-title">${personaje.name}</h2>
                <p class="card-clan">${personaje.clan}</p>
                <p class="card-team">${personaje.team[0]}</p>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

obtenerPersonajes()