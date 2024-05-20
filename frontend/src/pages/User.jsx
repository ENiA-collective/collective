import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.message);
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  return (
    <div>
      <img alt="profile image" src={userProfile.pfp_src} />
      <h1>{userProfile.display_name}</h1>
      <p>{userProfile.username}</p>
      <p>Pronouns: {userProfile.pronouns}</p>
      <p>Bio: {userProfile.bio}</p>
      <ul>
        {userProfile.posts.map(post => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
      {isCurrentUserProfile && (
        <>
          <Link to={`/users/${id}/edit`}>
            <button>Edit Profile</button>
          </Link>
          <button onClick={handleLogout}>Log Out</button>
          <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </>
      )}
    </div>
  );
}
