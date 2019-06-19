class Pokedex {
  constructor(newPokeData) {
    this.pokeData = newPokeData;
    this.nextDataSet = this.newPokeData.next;
    this.pokemonList = [];
  }

  cleanPokeData = async uncleanPokeData => {
    let responses = await Promise.all(
      uncleanPokeData.results.map(currentPoke => fetch(currentPoke.url))
    );
    let cleanPokeData = await Promise.all(
      responses.map(result => result.json())
    );

    addPokemonToList(cleanPokeData);
  };

  addPokemonToList = cleanPokeData => {
    cleanPokeData.forEach(pokemon => this.pokemonList.push(pokemon));
  };

  findByType = type => {
    const filteredPokemon = pokemon.filter(poke => {
      for (let i = 0; i < poke.types.length; i++) {
        // const { name } = poke.type[i].type;
        console.log(poke.types[i].type);
      }
    });
  };
}

export default Pokedex;
