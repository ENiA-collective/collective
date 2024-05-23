import { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="flex justify-center items-center mt-4">
      <input
        id="search-bar"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Search..."
        required
        maxLength={250}
        className="w-64 p-4 m-0 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-l-full outline-none transition duration-300 ease-in-out focus:ring-2 focus:ring-secondary focus:border-transparent"
      />
      <button
        onClick={() => handleSearch(query)}
        className="bg-secondary p-4 text-white rounded-r-full font-semibold text-lg m-0 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[2px_5px_0_0_black] active:translate-y-0.5 active:translate-x-0.25 active:shadow-none"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
