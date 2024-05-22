import React, { useState, useEffect, lazy, Suspense } from 'react';
import fetchListings, { searchListings } from '../adapters/listing-adapter';
import SearchBar from '../components/SearchBar';

const ListingCard = lazy(() => import('../components/ListingCard'));

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchListingsData = async () => {
      const fetchedListings = await fetchListings();
      setListings(fetchedListings);
    };

    fetchListingsData();
  }, []);

  useEffect(() => {
    if (!searchTerm) return;
    const loadSearch = async () => {
      const searchData = await searchListings(searchTerm);
      setListings(searchData);
    };
    loadSearch();
  }, [searchTerm]);

  const handleSearch = (input) => {
    setSearchTerm(input);
  };

  return (
    <div className="home-page px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">All Listings</h1>
      <SearchBar handleSearch={handleSearch} />
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 mt-4">
        {listings.map(listing => (
          <div key={listing.id} className="mb-4 break-inside-avoid-column">
            <Suspense fallback={<div>Loading...</div>}>
              <ListingCard listing={listing} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
