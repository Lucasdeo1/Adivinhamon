async function getRandomPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000');
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomPokemon = data.results[randomIndex];
        return randomPokemon;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function displayRandomPokemon() {
    const randomPokemon = await getRandomPokemon();
    const pokemonName = randomPokemon.name;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await response.json();
    
    const pokemonImage = pokemonData.sprites.front_default;
    const imageElement = document.getElementById('pokemon-image');
    imageElement.src = pokemonImage;

    window.currentPokemonName = pokemonName;
}

const checkButton = document.getElementById('check-button');

checkButton.addEventListener('click', function () {
    const userInput = prompt('Qual é o nome desse Pokémon?').toLowerCase();
    const correctAnswer = window.currentPokemonName;

    if (userInput === correctAnswer) {
        alert('Parabéns, você acertou!');
        displayRandomPokemon();
    } else {
        alert(`Resposta incorreta. O Pokémon é ${correctAnswer}. Tente novamente!`);
    }
});

displayRandomPokemon();
