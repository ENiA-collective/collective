import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListing } from "../adapters/listing-adapter";
import { getUser } from "../adapters/user-adapter";
import CurrentUserContext from "../contexts/CurrentUserContext";
import UserLink from '../components/buttons/UserLink'
import DeleteListing from "../components/buttons/DeleteListing";
import RequestItem from "../components/buttons/RequestItem";
import { readableDate } from "../utils";


const Listing = () => {
  const navigate = useNavigate()
  const { id } = useParams() 
  const { currentUser } = useContext(CurrentUserContext)
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

  const handleEdit = () => {
    navigate(`/listings/${id}/edit`)
  }

  const userObj = currentUser ?? { id: 0 }
  // we want users who are not logged in to be able to view listings
  // however, when there is no current user, it crashes because the object is null
  // this will use a pseudo-user object if no user is found, as ID is the only
  // property needed here, and it is not possible for the id to be 0


  return <>
    <h1>{listing.title}</h1>
    <img src={listing.image_src} />
    <p>Posted on: {readableDate(listing.created_at)}</p>
    <img src={originalPoster.pfp_src} />
    <p>Posted by: <UserLink user={ originalPoster} /></p>
    <p>Description: {listing.description}</p>
    {errorText && <p>{errorText}</p>}
    {userObj === originalPoster.id ?
      <>
        <button type="button" onClick={() => navigate(`/orders/my-gifts`)}>View Orders - {listing.order_count} Request(s) made!</button>
        <button type="button" onClick={handleEdit}>Edit Listing</button>
        <DeleteListing listingId={listing.id} setErrorText={setErrorText} />
      </>
      :
        <RequestItem listing={listing} setErrorText={setErrorText} />
    }
  </>
}

export default Listing;
// should render amount of requests and redirect to order screen if the user owns the listing