import { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import UploadWidget from "../components/UploadWidget";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '', display_name: '', pronouns: '', pfp_src: '' });

  useEffect(() => {
    console.log(formData)
  }, formData)

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    const { username, password, confirmPassword } = formData;
    if (!username || !password) return setErrorText('Missing username or password');
    if (password !== confirmPassword) return setErrorText('Passwords do not match')

    const [user, error] = await createUser(formData);
    if (error) return setErrorText(error.message);
    if (!user) return setErrorText('Username taken')

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = (secure_url) => {
    setFormData(prevData => ({
      ...prevData,
      pfp_src: secure_url
    }))
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} aria-labelledby="create-heading">
        <h2 id="create-heading">Create New User</h2>
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={formData.username}
          required
        />

        <label htmlFor="display_name">Display Name</label>
          <input
            autoComplete="off"
            type="text"
            id="display_name"
            name="display_name"
            onChange={handleChange}
            value={formData.display_name}
          />

        <label htmlFor="pronouns">Pronouns</label>
          <input
            autoComplete="off"
            type="text"
            id="pronouns"
            name="pronouns"
            onChange={handleChange}
            value={formData.pronouns}
          />

        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          autoComplete="off"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
          required
        />
        <UploadWidget onUpload={handleImageUpload}/>
        <label htmlFor="profilePicture">Upload Profile Picture</label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          accept="image/*"
          onChange={handleChange}
        />

        {/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
            <label htmlFor="password-confirm">Password Confirm</label>
            <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
        */}

        <button>Submit</button>
      </form>
      {errorText && <p>{errorText}</p>}
      <p>Already have an account with us? <Link to="/login">Log in!</Link></p>

    </>
  );
}

export default SignUpPage;
