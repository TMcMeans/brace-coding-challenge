import React, { useState } from 'react';

/* Search Form */
const SearchForm = props => {
  const [type, setPokemonType] = useState({
    type: ''
  });

  const handleInputChange = e => {
    const { value } = e.target;
    setPokemonType(value);
    console.log(`filtering by pokemon type: ${type}`);
    props.filterPokemonByType(type);
  };

  return (
    <form>
      <input
        type="text"
        name="searchInput"
        onChange={handleInputChange}
        placeholder="filter by Pokemon type"
        value={type}
      />
    </form>
  );
};

/* Poke List */
const PokeList = ({ pokemon }) => {
  const pokemonList = pokemon.map(currentPokemon => (
    <li className="single-pokemon" key={currentPokemon.name}>
      <img
        src={currentPokemon.sprites.front_default}
        alt={currentPokemon.name}
      />
      {currentPokemon.name}
    </li>
  ));

  return <div className="poke-list">{pokemonList}</div>;
};

/* App */
const App = () => {
  const [pokemon, savePokemon] = useState({
    pokemon: []
  });

  const [nextURL, setNextURL] = useState({
    nextURL: ''
  });

  const [filteredPokemon, filterPokemon] = useState({
    filteredPokemon: []
  });

  const getPokemon = async (e, URL = 'https://pokeapi.co/api/v2/pokemon/') => {
    console.log('getting more pokemon');
    e.preventDefault();
    try {
      const results = await fetch(URL);
      let fetched = await results.json();

      setNextURL(fetched.next);

      let responses = await Promise.all(
        fetched.results.map(currentPoke => fetch(currentPoke.url))
      );
      let newPokeData = await Promise.all(
        responses.map(result => result.json())
      );

      if (pokemon.length) {
        let allCollectedPokemon = [...pokemon, ...newPokeData];
        savePokemon(allCollectedPokemon);
      } else {
        savePokemon(newPokeData);
      }
    } catch (error) {
      //ADD ERROR HANDLING
      console.log(error);
    }
  };

  const filterPokemonByType = type => {
    const filteredPokemon = pokemon.filter(poke => {
      for (let i = 0; i < poke.types.length; i++) {
        const { name } = poke.types[i].type;

        if (name.includes(type)) {
          return poke;
        }
      }
    });

    filterPokemon(filteredPokemon);
  };

  if (pokemon.length) {
    return (
      <div className="app">
        <h1>Pokedex</h1>
        <p>Search by type</p>
        <SearchForm filterPokemonByType={filterPokemonByType} />
        <PokeList
          pokemon={filteredPokemon.length ? filteredPokemon : pokemon}
        />
        <button
          onClick={e => {
            getPokemon(e, nextURL);
          }}
        >
          View more
        </button>
      </div>
    );
  } else {
    return (
      <div className="app">
        <h1>Pokedex</h1>
        <button onClick={getPokemon}>Click to view all entries</button>
      </div>
    );
  }
};

export default App;

//FINISHED TASKS
// Publically accessible API- https://pokeapi.co/api/v2/type/{type}
//Describes type of data user will receive along with a button
//When button is clicked it calls to the api, and displays the data on screen replacing the description text with a table or list type view
//Allow a user to request more items somehow. This should add to the current list, rather than replacing it
//Add an input somewhere that, as a user types into it, filters the currently showing results (no need to fetch things based on this). (CURRENTLY NOT WORKING PERFECTLY)

//WIP
// 4. When clicking on an item in this list or table view, navigate to an item specific view that shows a bit more detail.
// Please DO use a routing library (react-router, router-5, whatever-other-router).

//HOW TO SUBMIT
// Send us an archive (zip, or the like) of your code sample, including the git history.
// As a heads up, the next phase of the interview will contain a discussion of your work and process, as well as working with an engineer here to expand on this application.
