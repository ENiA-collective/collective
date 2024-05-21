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
    <div>
      <img alt="profile image" src={userProfile.pfp_src} />
      <h1>{userProfile.display_name}</h1>
      <h2>@{userProfile.username}</h2>
      <p>{userProfile.pronouns}</p>
      <p>Joined: {readableDate(userProfile.created_at) }</p>
      <p>{userProfile.bio}</p>
      

      {isCurrentUserProfile && (
        <div>
          <button onClick={() => navigate(`/users/${id}/edit`)}>Edit Profile</button>
          <button onClick={handleLogout}>Log Out</button>
          <button type="button" onClick={() => navigate('/orders/my-gifts')}>Orders: Giving</button>
          <button type="button" onClick={() => navigate('/orders/my-orders')}>Orders: Receiving</button>
        </div>
      )}

      <h2>Posts</h2>
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
}