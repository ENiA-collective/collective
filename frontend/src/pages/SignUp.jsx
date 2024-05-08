import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        /* Replace with actual API call signup logic
        
        const signUpSuccessful = true;
        
        if (signUpSuccessful) {
            navigate(-1, { replace: true });
        } else {
            setError('Sign up failed. Please try again.');
        }
         */
    };

return (
    <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
            </div>
            <div>
                <label>Display Name:</label>
                <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required />
            </div>
            <div>
                <label>Password:</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required />
            </div>
            <div>
                <label>Profile Picture:</label>
                <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                required
                />
            </div>
                <button type="submit">Submit</button>
        </form>
        <div className="login-link">
        <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    </div>
);

};

export default SignUp;


/* import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";

// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // We could also use a single state variable for the form data:
  // const [formData, setFormData] = useState({ username: '', password: '' });
  // What would be the pros and cons of that?

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!username || !password) return setErrorText('Missing username or password');

    const [user, error] = await createUser({ username, password });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  return <>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit} onChange={handleChange} aria-labelledby="create-heading">
      <h2 id="create-heading">Create New User</h2>
      <label htmlFor="username">Username</label>
      <input
        autoComplete="off"
        type="text"
        id="username"
        name="username"
        onChange={handleChange}
        value={username}
      />

      <label htmlFor="password">Password</label>
      <input
        autoComplete="off"
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
        value={password}
      />

      {/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
        <label htmlFor="password-confirm">Password Confirm</label>
        <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
      //}

      <button>Sign Up Now!</button>
    </form>
    { !!errorText && <p>{errorText}</p> }
    <p>Already have an account with us? <Link to="/login">Log in!</Link></p>
  </>;
}

*/
