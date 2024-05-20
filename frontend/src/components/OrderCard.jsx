
//for viewing orders. a separate component and not an individual page because there's more than one order list
//think - viewing all the orders you placed AND viewing all the orders that have been placed on items you postedimport { useEffect, useState } from "react";

import { useEffect, useState } from "react";

import { fetchListing, makeUnavailable } from "../adapters/listing-adapter";
import { getUser } from "../adapters/user-adapter";
import { readableDate } from "../utils";
import UserLink from "./buttons/UserLink";
import { fulfillOrder } from "../adapters/order-adapter";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order, receiving, setErrorText }) => {
  const navigate = useNavigate()

  const [listing, setListing] = useState({description: ''}) // removing this property will break the truncateDescription function
  const [otherUser, setOtherUser] = useState('')
  const [fulfillButtonText, setFulfillButtonText] = useState('Mark Fulfilled')

  useEffect(() => {
    if (!order.id) return

    const loadListing = async () => {
      const [fetchedListing, error] = await fetchListing(order.listing_id);
      if (error) return setErrorText(error.message);
      if (!fetchedListing.id) return setListing({
        title: 'Deleted', available: false, img_src: '', description: 'This listing was removed.'
      });
      setListing(fetchedListing);
    };
    loadListing();
    console.log(listing)
    const loadUser = async () => {
      const user_id = receiving ? order.giver_user_id : order.getter_user_id;
      const [user, error] = await getUser(user_id);
      if (error) return setErrorText(error.message);
      setOtherUser(user);
    };
    loadUser();

  }, [order, fulfillButtonText])

  const getStatus = () => {
    if (listing.available) return 'Available'
    if (order.fulfilled) return receiving ? 'Claimed by you!' : `Claimed by ${otherUser.username}`
    return 'Unavailable'
  }
  
  const truncateDescription = (string) => {
    if (string.length <= 240) return string
    return string.slice(0, 240) + '...'
  }

  const handleFullfill = async () => {
    const [updatedOrder, error] = await fulfillOrder(order.id)
    if (error) return setErrorText(error.message)
    const [updatedListing, listingError] = await makeUnavailable(listing.id)
    if (listingError) return setErrorText(listingError.message)
    setFulfillButtonText('Fulfilled!') // i'd like for this text to show up before the button vanishes, but i feel like we have more important details to focus on
  }

  return <>
    <h2>{listing.title}</h2>
    <h3>Status: { getStatus() }</h3>
    <img src={listing.image_src} />
    <p>{truncateDescription(listing.description)}</p>
    <p>Requested By: <UserLink user={otherUser} /></p>
    <p>Requested At: {readableDate(order.created_at)}</p>
    <button type="button" onClick={() => navigate(`/chat/${order.id}`)}>Chat</button>
    {!receiving && listing.available && <button type="button" onClick={handleFullfill}>{fulfillButtonText}</button>}
  </>
}

export default OrderCard