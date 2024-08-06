const pokemonContainer = document.getElementById('pokemon-container');
const loadMoreButton = document.getElementById('load-more');
const loadingSpinner = document.getElementById('loading-spinner');
let offset = 0;
const limit = 20;

async function fetchPokemonList() {
    loadingSpinner.style.display = 'block';
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    displayPokemonList(data.results);
    loadingSpinner.style.display = 'none';
}

async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function displayPokemonList(pokemonList) {
    pokemonList.forEach(async pokemon => {
        const pokemonDetails = await fetchPokemonDetails(pokemon.url);
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('col-md-3', 'pokemon-card');
        
        pokemonCard.innerHTML = `
            <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}">
            <h5>${pokemonDetails.name}</h5>
            <div>${pokemonDetails.types.map(typeInfo => `<span class="pokemon-type" style="background-color: ${getTypeColor(typeInfo.type.name)}">${typeInfo.type.name}</span>`).join('')}</div>
            <button class="btn btn-info mt-2" onclick="showMoreInfo('${pokemonDetails.name}')">Más información</button>
        `;
        
        pokemonContainer.appendChild(pokemonCard);
    });
}

function getTypeColor(type) {
    const colors = {
        fire: '#EE8130',
        water: '#6390F0',
        grass: '#7AC74C',
        // Agrega más colores según los tipos
    };
    return colors[type] || '#A8A77A';
}

async function showMoreInfo(pokemonName) {
    const pokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const data = await pokemonDetails.json();

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <img src="${data.sprites.front_default}" alt="${data.name}" class="img-fluid mb-3">
        <h5>Nombre: ${data.name}</h5>
        <p>Tipos: ${data.types.map(typeInfo => `<span class="badge badge-primary">${typeInfo.type.name}</span>`).join(' ')}</p>
        <p>Habilidad: ${data.abilities[0].ability.name}</p>
        <p>Movimientos: ${data.moves.slice(0, 4).map(moveInfo => moveInfo.move.name).join(', ')}</p>
    `;

    $('#pokemonModal').modal('show');
}


loadMoreButton.addEventListener('click', () => {
    offset += limit;
    fetchPokemonList();
});

// Cargar los primeros 20 Pokémon al inicio
fetchPokemonList();
