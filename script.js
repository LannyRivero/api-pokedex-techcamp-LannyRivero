
const pokeContainer = document.getElementById('poke-container');
const pokeCount = 150;

// Colores para los diferentes tipos de Pokémon
const TYPE_COLORS = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
};

// Tipos de Pokémon que vamos a usar
const mainTypes = Object.keys(TYPE_COLORS);

/**
 * Función que carga la Pokédex.
 * Limpia el contenedor y luego genera una tarjeta para cada Pokémon.
 */
const loadPokedex = async () => {
    pokeContainer.innerHTML = ''; // Limpiar el contenedor antes de empezar
    const fetchPromises = Array.from({ length: pokeCount }, (_, index) => fetchPokemon(index + 1));
    const pokemons = await Promise.all(fetchPromises);
    pokemons.forEach(createPokemonCard); // Crear una tarjeta por cada Pokémon
};

// Función para obtener los datos de un Pokémon
const fetchPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    return response.json();
};

// Crea una tarjeta para cada Pokémon
const createPokemonCard = (pokemon) => {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon');

    // Obtenemos el tipo de Pokémon y su color asociado
    const pokeTypes = pokemon.types.map((type) => type.type.name);
    const primaryType = mainTypes.find((type) => pokeTypes.includes(type));
    const backgroundColor = TYPE_COLORS[primaryType] || '#fff'; // Si no hay tipo, se usa blanco
    pokemonCard.style.backgroundColor = backgroundColor;

    // Formateamos el ID del Pokémon para que siempre tenga 3 dígitos
    const formattedId = pokemon.id.toString().padStart(3, '0');

    // Creamos el contenido HTML de la tarjeta
    pokemonCard.innerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
        </div>
        <div class="info">
            <span class="number">#${formattedId}</span>
            <h3 class="name">${capitalize(pokemon.name)}</h3>
            <small class="type">Tipo: <span>${primaryType}</span></small>
        </div>
    `;

    // Añadimos la tarjeta al contenedor principal
    pokeContainer.appendChild(pokemonCard);
};

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// Iniciamos la carga de la Pokédex
loadPokedex();
