import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import { getUser } from "../adapters/user-adapter";
import { fetchListingsByUser } from "../adapters/listing-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import ListingCard from '../components/ListingCard';

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await getUser(id);
        setUserProfile(user);

        const userListings = await fetchListingsByUser(id);
        setListings(userListings);
      } catch (error) {
        setErrorText(error.message);
      }
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

  return (
    <div>
      <img alt="profile image" src={userProfile.pfp_src} />
      <h1>{userProfile.displayName}</h1>
      <h2>@{userProfile.username}</h2>
      <p>{userProfile.pronouns}</p>
      <p>{userProfile.bio}</p>

      {isCurrentUserProfile && (
        <div>
          <button onClick={() => navigate(`/users/${id}/edit`)}>Edit Profile</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}

      <h2>Posts</h2>
      <ul>
        {listings.map(listing => (
          <li key={listing.id}>
            <ListingCard listing={listing} />
          </li>
        ))}
      </ul>
    </div>
  );
}
