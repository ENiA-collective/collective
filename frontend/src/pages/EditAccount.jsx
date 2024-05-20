//TODO: ...this is just a copy and paste of the sign up form! refactor to handle edits instead of creating
//a brand new resource
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import { updateUser, getUser } from "../adapters/user-adapter";
import EditProfileForm from "../components/EditProfileForm.jsx";

const EditAccount = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState("");
  const [formData, setFormData] = useState({
    display_name: "",
    pronouns: "",
    bio: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      const [user, error] = await getUser(id);
      if (error) {
        setErrorText(error.message);
      } else {
        setFormData({
          display_name: user.display_name || "",
          pronouns: user.pronouns || "",
          bio: user.bio || "",
        });
      }
    };

    if (currentUser && currentUser.id === parseInt(id, 10)) {
      loadUserData();
    } else {
      navigate('/login');
    }
  }, [currentUser, id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");

    const updateData = {
      display_name: formData.display_name,
      pronouns: formData.pronouns,
      bio: formData.bio,
    };

    const [updatedUser, error] = await updateUser(currentUser.id, updateData);
    if (error) {
      setErrorText(error.message);
    } else {
      setCurrentUser(updatedUser);
      navigate(`/users/${currentUser.id}`);
    }
  };

  if (!currentUser) return <p>Loading...</p>;

  return (
    <>
      <h1>Edit Account</h1>
      <EditProfileForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
      {errorText && <p>{errorText}</p>}
      <p>
        Want to change your password? <Link to='/change-password'>Change Password</Link>
      </p>
    </>
  );
};

export default EditAccount;
