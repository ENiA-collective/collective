import { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* <label htmlFor="search-bar">Search: </label> */}
      <input
        id="search-bar"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        required
        maxLength={250}
      />
      <button
        onClick={() => handleSearch(query)}
        className="bg-text text-white rounded-full font-semibold text-lg px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[2px_5px_0_0_black] active:translate-y-0.5 active:translate-x-0.25 active:shadow-none"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;