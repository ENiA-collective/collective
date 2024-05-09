import React, { useState } from 'react';

const PostForm = () => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemImage, setItemImage] = useState(null);
    const [userCoordinates, setUserCoordinates] = useState(null);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation not supported by browser')
        }

        const userId = getLoggedInUserId();
        setLoggedInUserId(userId);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setItemImage(file);

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('itemDescription', itemDescription);
        if (itemImage) {
            formData.append('itemImage', itemImage);
        }
        if (userCoordinates) {
            formData.append('userLatitude', userCoordinates.latitude);
            formData.append('userLongitude', userCoordinates.longitude);
        }
        if (loggedInUserId) {
            formData.append('userId', loggedInUserId);
        }  
        
        /* Handle form submission / request to backend here */

}
    return (
        <div>
            <h1>List an Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="itemName">Item Name:</label>
                    <input
                    type="text"
                    id="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required />
                </div>
                <div>
                    <label htmlFor="itemDescription">Item Description:</label>
                    <input
                    type="text"
                    id="itemDescription"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    required />
                </div>
                <div>
                    <label htmlFor="itemImage">Upload Image:</label>
                    <input
                    type="file"
                    id="itemImage"
                    accept="image/*"
                    onChange={handleFileChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default PostForm;