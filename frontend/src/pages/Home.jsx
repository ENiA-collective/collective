import React, { useState, useEffect, lazy, Suspense } from 'react';
import fetchListings from '../adapters/listing-adapter';

const ListingCard = lazy(() => import('../components/ListingCard'));

const HomePage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListingsData = async () => {
      try {
        const data = await fetchListings();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListingsData();
  }, []);

  return (
    <div>
      <h1>All Listings</h1>
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