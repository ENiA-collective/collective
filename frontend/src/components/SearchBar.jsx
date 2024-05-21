import { useState } from "react";

const SearchBar = ({handleSearch}) => {
  const [query, setQuery] = useState('')

  return <>
    <label htmlFor="search-bar">Search: </label>
    <input
      id='search-bar'
      onChange={(e) => setQuery(e.target.value)}
      value={query}
      required
    />
    <button onClick={() => handleSearch(query)}>Search</button>
  </>;
};

export default SearchBar