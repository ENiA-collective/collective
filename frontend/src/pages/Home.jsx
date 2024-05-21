import React, { useState, useEffect, lazy, Suspense } from 'react';
import fetchListings, { searchListings } from '../adapters/listing-adapter';
import SearchBar from '../components/SearchBar';

const ListingCard = lazy(() => import('../components/ListingCard'));

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchListingsData = async () => {
      const fetchedListings = await fetchListings();
      setListings(fetchedListings);
    };

    fetchListingsData();
  }, []);

  useEffect(() => {
    if(!searchTerm) return
    const loadSearch = async () => {
      const searchData = await searchListings(searchTerm)
      setListings(searchData)
    }
    loadSearch();

  }, [searchTerm])

  const handleSearch = (input) => {
    setSearchTerm(input)
  }

  return (
    <div>
      <h1>All Listings</h1>
      <SearchBar handleSearch={handleSearch} />
      <ul>
        {listings.map(listing => (
          <li key={listing.id}>
            <Suspense fallback={<div>Loading...</div>}>
              <ListingCard listing={listing} />
            </Suspense>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;