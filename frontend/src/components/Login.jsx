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