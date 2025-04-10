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
    actpagina = pagina;
    let start = (pagina - 1) * perPorPagina;
    let end = start + perPorPagina;
    let actPersonajes = personajes.slice(start, end);
    cardsContainer.innerHTML = '';

    // Crear card
    actPersonajes.forEach(personaje => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img class="card-image" src="${personaje.images[0]}" alt="">
            <div class="card-content">
                <h2 class="card-title">${personaje.name}</h2>
                <p class="card-clan">${personaje.personal?.clan || 'None'}</p>
                <p class="card-team">${personaje.debut?.manga}</p>
            </div>
        `;
        cardsContainer.appendChild(card);
    });

    //Deshabilitar estilos "active" de los botones
    document.querySelectorAll('#pagination button').forEach(button => button.classList.remove("active"))
    const bton = document.getElementById(`${pagina}-button`);
    if (bton){
        bton.classList.add("active");
    }
    for (let i = 1; i <= 5; i++){
        const bton = document.getElementById(`${i}-button`);
        bton.addEventListener('click', () => paginacion(i));
    }

}


obtenerPersonajes()