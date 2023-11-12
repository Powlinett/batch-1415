// TODO write your code here
// on fait une variable URL
// on fetch l'api
// on console.log la data
// on devra utiliser le template pour afficher les pokemon et le cloner pour importer el pokemon


// 1 . DECLARE VARIABLES IN GLOBAL SCOPE
const url = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20";

const cardTemplate = document.querySelector("#cardTemplate");
const cardsContainer = document.querySelector("#cardsContainer");

const infoTemplate = document.querySelector('#infoTemplate');
const infoContainer = document.querySelector('#infoContainer');

// 5 . DISPLAY A POKEMON DETAILS INFOS
const displayPokemonDetails = (pokemon) => {
  const infoClone = infoTemplate.content.cloneNode(true);

  infoClone.querySelector("h2").textContent = pokemon.name;
  infoClone.querySelector("img").src = pokemon.sprite;
  infoClone.querySelector("p").textContent = pokemon.types;

  infoContainer.innerHTML = '';
  infoContainer.appendChild(infoClone);
};

// 4 . DISPLAY A POKEMON CARD
const displayPokemon = (pokemon) => {
  const clone = cardTemplate.content.cloneNode(true);

  clone.querySelector("h2").textContent = pokemon.name;
  clone.querySelector("img").src = pokemon.sprite;
  clone.querySelector("p").textContent = pokemon.types;

  const link = clone.querySelector('a');

  link.addEventListener('click', () => displayPokemonDetails(pokemon));

  cardsContainer.appendChild(clone);
};

// 3 . FETCH ONE POKEMON DATA
const fetchPokemonData = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const pokemon = {
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types
          .map((type) => type.type.name)
          .join('')
      }

      displayPokemon(pokemon)
    });
};

// 2 . FETCH POKEMONS INDEX
fetch(url) 
.then(response => response.json())
.then(data => {
  data.results.forEach((result) => fetchPokemonData(result.url));
  });


// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     data.results.forEach((result) => {
//         fetch(result.url)
//           .then(response => response.json())
//           .then(pokemonData => {
//             const clone = cardTemplate.content.cloneNode(true);
//             const pokemonName = pokemonData.name;
//             const pokemonSprite = pokemonData.sprites.front_default;
//             const pokemonTypes = pokemonData.types.map((type) => type.type.name)     
//             const pokemonTypeString = pokemonTypes.join(", ");
//             clone.querySelector("h2").textContent = pokemonName;
//             clone.querySelector("img").src = pokemonSprite;
//             clone.querySelector("p").textContent = pokemonTypeString;

//             const link = clone.querySelector('a');

//             link.addEventListener('click', (event) => {
//               const infoClone = infoTemplate.content.cloneNode(true);

//               infoClone.querySelector("h2").textContent = pokemonName;
//               infoClone.querySelector("img").src = pokemonSprite;
//               infoClone.querySelector("p").textContent = pokemonTypeString;

//               infoContainer.innerHTML = '';
//               infoContainer.appendChild(infoClone);
//             });

//             cardsContainer.appendChild(clone);
//           });
//       });
//     });
