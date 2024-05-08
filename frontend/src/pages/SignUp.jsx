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
