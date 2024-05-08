import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate('');

    const handleLogin = async (e) => {
        e.preventDefault();
    
       /* Logic for validating login here
    
          if (response.ok) {
            navigate(-1, { replace: true });
          } else {
            setError('Invalid username or password');
          }
        } catch (error) {
          setError('An error occurred. Please try again later.');
          console.error('Login error:', error);
        } */
}

return (
    <div className="login-container">
        <img src="/path/to/profile-pic.jpg" alt="Blank Profile" className="profile-image"/>
        <form onSubmit={handleLogin} className="login-form">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
                <label>Username:</label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            <button type="submit">Login</button>
        </form>
        <div className="signup-link">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    </div>
);
};

export default Login;


/* 
import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    const formData = new FormData(event.target);
    const [user, error] = await logUserIn(Object.fromEntries(formData));
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  if (currentUser) return <Navigate to="/" />;

  return <>
    <h1>Login</h1>
    <form onSubmit={handleSubmit} aria-labelledby="login-heading">
      <h2 id='login-heading'>Log back in!</h2>
      <label htmlFor="username">Username</label>
      <input type="text" autoComplete="username" id="username" name="username" />

      <label htmlFor="password">Password</label>
      <input type="password" autoComplete="current-password" id="password" name="password" />

      <button>Log in!</button>
    </form>
    { !!errorText && <p>{errorText}</p> }
  </>;
}

*/