import React, { useState, useEffect, Suspense } from 'react';
import fetchListings from '../adapters/listing-adapter';

// Lazy load the Listing component
const LazyListing = React.lazy(() => import('./Listing'));

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListingsData = async () => {
      try {
        const data = await fetchListings();
        setListings(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListingsData();
  }, []);

  return (
    <div>
      <h1>All Listings</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Suspense fallback={<p>Loading listings...</p>}>
          <ul>
            {listings.map(listing => (
              <LazyListing key={listing.id} listing={listing} />
            ))}
          </ul>
        </Suspense>
      )}
    </div>
  );
};

export default HomePage;