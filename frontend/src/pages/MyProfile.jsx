import React from 'react';

const MyProfile = ({onLogout}) => {
    const handleLogout = () => {
        /* Logout logic such as clearing user session, redirecting to
        login or home page, etc */

        onLogout();
    }

    return (
        <div>
            <h1>My Profile</h1>
            <p>Welcome to my profile!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}


export default MyProfile;