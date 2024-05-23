import React, { useState, useEffect, lazy, Suspense, useContext } from 'react';
import fetchListings, { searchListings } from '../adapters/listing-adapter';
import SearchBar from '../components/SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

const ListingCard = lazy(() => import('../components/ListingCard'));

const HomePage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { currentUser } = useContext(CurrentUserContext);

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
    <div className="home-page">
      {/* <h1 className="text-2xl font-semibold mb-4">All Listings</h1> */}
      { !currentUser &&
        <div className="hero min-h-screen bg-secondary w-full">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3RoaW5nJTIwc3dhcHxlbnwwfHwwfHx8MA%3D%3D"
              className="max-w-sm rounded-lg shadow-2xl" />
            <div>
              <h1 className="text-5xl font-bold">Cleaning out your closet?</h1>
              <p className="py-6">
                We got you covered. Collective is an application where people can give away unwanted clothing for nothing in exchange.
                We aim to combat textile waste while creating avenues of community connection. <Link className="italic font-bold text-background underline decoration-background"to="/about">Learn more about our mission.</Link>
              </p>
              <button className="btn btn-text" onClick={() => navigate('/signup')}>Get Started</button>
            </div>
          </div>
        </div>
      }
      <SearchBar handleSearch={handleSearch} />

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 mt-4 px-4">
        {listings.map(listing => (
          <div key={listing.id} className="mb-4 break-inside-avoid-column">
            <Suspense fallback={<span className="loading loading-ring loading-lg text-primary"></span>}>
              <ListingCard listing={listing} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
