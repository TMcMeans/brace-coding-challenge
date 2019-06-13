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

export default SearchForm;
