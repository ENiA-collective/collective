import React, { useState, useEffect } from 'react';

const PostForm = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        itemDescription: '',
        itemImage: null,
        userCoordinates: null,
        loggedInUserId: null
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prevData => ({
                        ...prevData,
                        userCoordinates: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    }));
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation not supported by browser')
        }

        const userId = getLoggedInUserId();
        setFormData(prevData => ({
            ...prevData,
            loggedInUserId: userId
        }));
    }, []);

    /* Function to get logged in user ID */

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevData => ({
            ...prevData,
            itemImage: file
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        /* Handle form submission / request to backend here */
    };

    return (
        <div>
            <h1>List an Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="itemName">Item Name:</label>
                    <input
                        type="text"
                        id="itemName"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleInputChange}
                        required />
                </div>
                <div>
                    <label htmlFor="itemDescription">Item Description:</label>
                    <input
                        type="text"
                        id="itemDescription"
                        name="itemDescription"
                        value={formData.itemDescription}
                        onChange={handleInputChange}
                        required />
                </div>
                <div>
                    <label htmlFor="itemImage">Upload Image:</label>
                    <input
                        type="file"
                        id="itemImage"
                        name="itemImage"
                        accept="image/*"
                        onChange={handleFileChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PostForm;
