const pokemonCount = 150;

const colors = {
    // Definindo cores associadas aos tipos de Pokémon
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

const mainTypes = Object.keys(colors); // Extraindo as chaves (tipos de Pokémon) do objeto colors

const fetchPokemon = async (id) => {
    // Buscando dados do Pokémon com base no ID fornecido
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data);
};

function mostrar_div() {
    // Exibindo a div #info
    let div = document.querySelector("#info");
    div.classList.remove("ocultar");
}

function limpar() {
    // Limpando o campo de entrada
    let input = document.getElementById("valor_list");
    input.value = '';
}

function listar() {
    // Lidando com a funcionalidade de pesquisa de Pokémon
    let pokeId = document.getElementById("valor_list").value;
    limpar();
    mostrar_div();
    fetchPokemon(pokeId);
}

const createPokemonCard = (poke) => {
    // Criando um cartão de Pokémon e preenchendo-o com dados
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name; // Obtendo o nome do Pokémon
    const id = poke.id.toString().padStart(3, '0'); // Formatando o ID do Pokémon

    const pokeTypes = poke.types.map(type => type.type.name); // Extraindo os tipos do Pokémon
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1); // Determinando o tipo principal
    const color = colors[type]; // Obtendo a cor associada ao tipo principal

    card.style.background = color; // Definindo a cor de fundo do cartão

    const pokemonInnerHTML = `
    <h1>INFORMAÇÕES</h1>
    <br>
        <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
    `;

    card.innerHTML = pokemonInnerHTML; // Preenchendo o cartão com conteúdo HTML
    document.querySelector("#info").innerHTML = ''; // Limpando a div #info
    document.querySelector("#info").appendChild(card); // Anexando o cartão à div #info
};

async function fetchPokemonNames() {
    // Buscando uma lista de nomes de Pokémon
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const data = await response.json();
    const pokemonNames = data.results.map(pokemon => pokemon.name);
    return pokemonNames;
}

async function populatePokemonDatalist() {
    // Preenchendo o datalist com os nomes de Pokémon
    const datalist = document.getElementById('datalistOptions');
    const pokemonNames = await fetchPokemonNames();

    pokemonNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        datalist.appendChild(option);
    });
}

window.addEventListener('load', populatePokemonDatalist); // Adicionando um ouvinte de eventos para preencher o datalist quando a página carrega
