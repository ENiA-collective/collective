import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getListing } from "../adapters/listing-adapter";
import { getUser } from "../adapters/user-adapter";
import CurrentUserContext from "../contexts/CurrentUserContext";


const Listing = () => {
  //const navigate = useNavigate()
  const { id } = useParams() 
  const {currentUser} = useContext(CurrentUserContext)
  const [errorText, setErrorText] = useState('')
  const [listing, setListing] = useState({})
  const [originalPoster, setOriginalPoster] = useState({username: ''})

  useEffect(() => {
    const loadListing = async () => {
      const [currentListing, error] = await getListing(id)
      if (error) return setErrorText(error.message)
      setListing(currentListing)
    };
    loadListing();
  }, [id])

  useEffect(() => {
    const loadUser = async () => {
        const [user, error] = await getUser(listing.user_id)
        if (error) return setErrorText(error.message)
        setOriginalPoster(user)
    };
    loadUser();
  }, [listing])
  //todo: make time not ugly + include original poster pfp
  //actually make all of it not ugly
  //usernames navigate to profile
  //buttons
  return <>
    <h1>{listing.title}</h1>
    <img src={listing.image_src} />
    <p>Posted on: {listing.created_at}</p>
    <img src={originalPoster.pfp_src} />
    <p>Posted by: <Link to={`/users/${originalPoster.id}`}> @{originalPoster.username}</Link ></p>
    <p>Description: {listing.description}</p>
    {errorText && <p>{errorText}</p>}
    {currentUser.id === originalPoster.id ?
      <>
        <button type="button">Edit Listing</button>
        <button type="button">Delete Listing</button>
      </>
      :
      <button type="button">Request Item</button>
    }
  </>
}

export default Listing;