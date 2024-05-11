import React, { useState, useEffect } from 'react';
import UploadWidget from '../components/UploadWidget';
//import { currentUser };
//import getLoggedInUserId - where is this function supposed to come from?
// this function also isn't necessary - just use the context
// todo: make sure only logged in users can access this form

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

        const userId = getLoggedInUserId(); // what is this function??
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

    const handleImageUpload = (secure_url) => {
      setFormData(prevData => ({
        ...prevData,
        pfp_src: secure_url
      }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        /* Handle form submission / request to backend here */
    };

  //  if()
  
    return (
      <div>
        <h1>List an Item</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="item-name">Item Name:</label>
            <input
               type="text"
                id="item-name"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                required />
          </div>
          <div>
            <label htmlFor="item-description">Item Description:</label>
            <input
              type="text"
              id="item-description"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleInputChange}
              required />
          </div>
          <div>
            <label htmlFor='upload-widget'>Item Image:</label>
            <UploadWidget id="upload-widget" onUpload={handleImageUpload} />
          </div>
             <button type="submit">Submit</button>
          </form>
        </div>
    );
}

export default PostForm;
