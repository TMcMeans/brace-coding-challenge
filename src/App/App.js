import React, { useState } from 'react';

const SearchForm = () => {
  const [type, getPokemonType] = useState({
    type: ''
  });
  return (
    <form action="">
      <input type="text" />
      <button>Search</button>
    </form>
  );
};

const PokeList = pokemon => {
  const pokemonList = pokemon.map(currentPokemon => <li />);
  return <div>{pokemonList}</div>;
};

const App = () => {
  const [pokemon, savePokemonByType] = useState({
    pokemon: []
  });

  const getPokemon = async e => {
    e.preventDefault();
    try {
      const result = await fetch('URL HERE');
      const pokemon = await result.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>Pokedex</h1>
      <button onClick={getPokemon}>Click to view all entries</button>
    </div>
  );
};

export default App;

//FINISHED TASKS
// Publically accessible API- https://pokeapi.co/api/v2/type/{type}
//Describes type of data user will receive along with a button

//WIP
// 1. When button is clicked it calls to the api, and displays the data on screen, replacing the description text with a table or list type view.
// 2. Allow a user to request more items somehow. This should add to the current list, rather than replacing it
// 3. Add an input somewhere that, as a user types into it, filters the currently showing results (no need to fetch things based on this).
// 4. When clicking on an item in this list or table view, navigate to an item specific view that shows a bit more detail.

// Please DO NOT use any api wrapping libraries, http libraries or state management tooling. Use fetch for http access and React component state/context for managing state.

// Please DO use create-react-app or something like it and a routing library (react-router, router-5, whatever-other-router).

// You're welcome to use either JavaScript or Typescript, but please make sure to use modern syntax conventions.

// Please style this using your preferred styling methods, we use styled-components, however use what you know best.

// We're only going to use the most recent version of chrome for reviewing this, and don't expect it to work flawlessly in every browser ever, so no need to waste time ensuring cross-browser compatibility

// Feel free to put some personality into this too, it should be a little fun (and hopefully not too stressful).

// ## How to submit

// Send us an archive (zip, or the like) of your code sample, including the git history.

// We're looking to see how you structure your code, your workflow and thought process. There's no need to write any tests, but you're free to do so if you find that helpful.

// As a heads up, the next phase of the interview will contain a discussion of your work and process, as well as working with an engineer here to expand on this application.
