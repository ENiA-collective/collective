import React, { useState, useEffect } from 'react';
import fetchListings from '../adapters/listing-adapter';

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
            <img src={listing.image_src} alt={listing.title} />
            <h2>{listing.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;