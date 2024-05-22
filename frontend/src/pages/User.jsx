import { lazy, useContext, useEffect, useState, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import { getUser } from "../adapters/user-adapter";
import { fetchListingsByUser } from "../adapters/listing-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import { readableDate } from "../utils.js";

const ListingCard = lazy(() => import('../components/ListingCard.jsx'))

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [errorText, setErrorText] = useState('');
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUserData = async () => {
      const [user, error] = await getUser(id);
      if(error) return setErrorText(error.message)
        setUserProfile(user);

      const userListings = await fetchListingsByUser(id);
      console.log(userListings)
        setListings(userListings);
    };

    loadUserData();
  }, [id]);

  const handleLogout = async () => {
    await logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;
  console.log(userProfile)
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-4 mb-4">
        <img alt="profile image" src={userProfile.pfp_src} className="w-24 h-24 rounded-full" />
        <div>
          <h1 className="text-2xl font-semibold">{userProfile.display_name}</h1>
          <h2 className="text-xl text-gray-600">@{userProfile.username}</h2>
          <p className="text-gray-600">{userProfile.pronouns}</p>
          <p className="text-gray-600">Joined: {readableDate(userProfile.created_at)}</p>
        </div>
      </div>
      <p className="mb-4">{userProfile.bio}</p>

      {isCurrentUserProfile && (
        <div className="flex space-x-2 mb-4">
          <button onClick={() => navigate(`/users/${id}/edit`)} className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary">Edit Profile</button>
          <button onClick={handleLogout} className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary">Log Out</button>
          <button type="button" onClick={() => navigate('/orders/my-gifts')} className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary">Orders: Giving</button>
          <button type="button" onClick={() => navigate('/orders/my-orders')} className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary">Orders: Receiving</button>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
}
