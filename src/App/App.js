import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

/* Search Form */
const SearchForm = props => {
  const [pokeType, setPokemonType] = useState('');

  const handleInputChange = e => {
    const { value } = e.target;
    setPokemonType(value);
    props.filterPokemonByType(pokeType);
  };

  return (
    <form className="search-input-form">
      <input
        className="search-input"
        type="text"
        name="searchInput"
        onChange={handleInputChange}
        placeholder="filter by Pokemon type"
        value={pokeType}
      />
    </form>
  );
};

/* Poke Page */
const PokePage = ({ singlePokemon }) => {
  //add key
  const types = singlePokemon.types.map(type => (
    <li className="type" key={type.type.name}>
      {type.type.name}
    </li>
  ));

  return (
    <div className="poke-page">
      <h1 className="stats">{singlePokemon.id}</h1>
      <h1 className="stats">{singlePokemon.name}</h1>
      <img
        className="single-poke-sprite"
        src={singlePokemon.sprites.front_default}
        alt={singlePokemon.name}
      />
      <img
        className="single-poke-sprite"
        src={singlePokemon.sprites.back_default}
        alt={singlePokemon.name}
      />
      <h3 className="stats">height: {singlePokemon.height}</h3>
      <h3 className="stats">weight: {singlePokemon.weight}</h3>
      <h3 className="stats type-title">types</h3>
      <ul className="stats-type">{types}</ul>
    </div>
  );
};

/* Poke List */
const PokeList = ({ pokemon }) => {
  const pokemonList = pokemon.map(singlePokemon => (
    <Link
      className="poke-link"
      to={`/${singlePokemon.name}`}
      key={singlePokemon.name}
    >
      <p className="poke-id">{singlePokemon.id}</p>
      <img
        className="poke-sprite"
        src={singlePokemon.sprites.front_default}
        alt={singlePokemon.name}
      />
      {singlePokemon.name}
    </Link>
  ));

  return <div className="poke-list">{pokemonList}</div>;
};

/* App */
const App = () => {
  const [pokemon, savePokemon] = useState([]);

  const [nextURL, setNextURL] = useState('');

  const [filteredPokemon, filterPokemon] = useState({
    filteredPokemon: []
  });

  const getPokemon = async (e, URL = 'https://pokeapi.co/api/v2/pokemon/') => {
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
        <h1 className="title">Pokedex</h1>
        <SearchForm filterPokemonByType={filterPokemonByType} />
        <PokeList
          pokemon={filteredPokemon.length ? filteredPokemon : pokemon}
        />
        <button
          className="view-more-btn"
          onClick={e => {
            getPokemon(e, nextURL);
          }}
        >
          View more
        </button>
        <Switch>
          {/* <Route exact path="/" component={App} /> */}
          <Route
            path="/:id"
            render={({ match }) => {
              const singlePokemon = pokemon.find(
                pokemon => pokemon.name === match.params.id
              );
              return <PokePage singlePokemon={singlePokemon} />;
            }}
          />
        </Switch>
      </div>
    );
  } else {
    return (
      <div className="app">
        <h1 className="title">Pokedex</h1>
        <button className="view-entries-btn" onClick={getPokemon}>
          view all entries
        </button>
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
//Please DO use a routing library (react-router, router-5, whatever-other-router).
//When clicking on an item in this list or table view, navigate to an item specific view that shows a bit more detail.

//HOW TO SUBMIT
// Send us an archive (zip, or the like) of your code sample, including the git history.
// As a heads up, the next phase of the interview will contain a discussion of your work and process, as well as working with an engineer here to expand on this application.
