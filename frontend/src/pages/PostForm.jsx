import React, { useState, useEffect, useContext } from 'react';
import UploadWidget from '../components/UploadWidget';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { createListing } from '../adapters/listing-adapter';
import { useNavigate } from 'react-router-dom';
//import getLoggedInUserId - where is this function supposed to come from?


const PostForm = () => {
  const navigate = useNavigate()

  const { currentUser } = useContext(CurrentUserContext)
  
  const [errorText, setErrorText] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_src: '',
    latitude: '',
    longitude: '',
    user_id: currentUser.id
  });


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prevData => ({
            ...prevData,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
          }));
        },
        (error) => {
          setErrorText('Error getting user location:', error);
        }
      );
    } else {
      setErrorText('Geolocation not supported by browser')
    }
  }, [])

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
        image_src: secure_url
      }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const { title, description, image_src } = formData
  
      if (!title) return setErrorText('Missing title')
      if (!description) return setErrorText('Missing description')
      if (!image_src) return setErrorText('Please upload an image')
    

      const [response, error] = await createListing(formData)
console.log({response, error})
      //if(error) return setErrorText(error)
      navigate('/')
    };

      //todo: make the words log in/ sign up links
    if (!currentUser) return <p>Please log in or sign up to be able to post.</p>
  
    return (
      <div>
        <h1>List an Item</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">title</label>
            <input
               type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required />
          </div>
          <div>
            <label htmlFor="description">Item Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required />
          </div>
          <div>
            <label htmlFor='upload-widget'>Item Image:</label>
            <UploadWidget id="upload-widget" onUpload={handleImageUpload} />   
          </div>
          {errorText && <p>{ errorText}</p>}
          {/*todo: disable submit button until image upload is complete */}
             <button type="submit">Submit</button>
          </form>
        </div>
    );
}

export default PostForm;
