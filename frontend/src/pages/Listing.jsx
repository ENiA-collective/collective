import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListing } from "../adapters/listing-adapter";
import { getUser } from "../adapters/user-adapter";
import CurrentUserContext from "../contexts/CurrentUserContext";
import UserLink from '../components/buttons/UserLink'
import DeleteListing from "../components/buttons/DeleteListing";
import RequestItem from "../components/buttons/RequestItem";


const Listing = () => {
  const navigate = useNavigate()
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

  const readableDate = (timestamp) => {
    const date = new Date(timestamp)
    const options = {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }

    return date.toLocaleString('en-US', options)
  }

  const handleEdit = () => {
    navigate(`/listings/${id}/edit`)
  }

  return <>
    <h1>{listing.title}</h1>
    <img src={listing.image_src} />
    <p>Posted on: {readableDate(listing.created_at)}</p>
    <img src={originalPoster.pfp_src} />
    <p>Posted by: <UserLink user={ originalPoster} /></p>
    <p>Description: {listing.description}</p>
    {errorText && <p>{errorText}</p>}
    {currentUser.id === originalPoster.id ?
      <>
        <button type="button" onClick={handleEdit}>Edit Listing</button>
        <DeleteListing listingId={listing.id} setErrorText={setErrorText} />
      </>
      :
        <RequestItem />
    }
  </>
}

export default Listing;