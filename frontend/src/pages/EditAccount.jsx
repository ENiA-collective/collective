//TODO: ...this is just a copy and paste of the sign up form! refactor to handle edits instead of creating
//a brand new resource
import { useContext, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { updateUser } from "../adapters/user-adapter";
import AccountForm from "../components/AccountForm";

const EditAccount = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  if (!currentUser) return navigate(-1)
  
  const [errorText, setErrorText] = useState("");
  const [formData, setFormData] = useState({
    display_name: currentUser.display_name,
    pronouns: currentUser.pronouns,
    bio: currentUser.bio,
    username: currentUser.username,
    password: '',
    confirmPassword: '',
    pfp_src: currentUser.pfp_src
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    const { password, confirmPassword, username } = formData 
    if (!username || !password) return setErrorText('Missing username or password')
    if(password !== confirmPassword) return setErrorText('Passwords do not match')

    const [updatedUser, error] = await updateUser(id, formData);
    // go into adapters and controller to handle the new info
    if (error) return setErrorText(error.message);
    if (!updatedUser) return setErrorText('Username taken')
    setCurrentUser(updatedUser);
    navigate(`/users/${id}`);
  };

  if (!currentUser) return <p>Loading...</p>;

  return (
    <>
      <AccountForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} newUser={false} />
      {errorText && <p>{errorText}</p>}
    </>
  );
};

export default EditAccount;
