
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
    if (order.fulfilled) return receiving ? 'Claimed by you!' : 'Claimed by another user.'
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

  return <div
  className="flex flex-col items-center relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:transform hover:translate-y-[-5px] mb-4 break-inside-avoid-column">
    <div>
      <div className="m-4">
        <h2 className="text-xl font-bold">{listing.title}</h2>
        <h3>Status: {getStatus()}</h3>
      </div>
      <img src={listing.image_src} />
      <div className="mx-4">
       <p className="font-italic my-4">{truncateDescription(listing.description)}</p>
        <p>Requested {receiving ? 'From:' : 'By:'} <UserLink user={otherUser} /></p>
        <p>Requested At: {readableDate(order.created_at)}</p>
      </div>
    </div>

    <div>
    <button
      type="button"
      onClick={() => navigate(`/chat/${order.id}`)}
      className='m-4 bg-secondary text-text rounded-full font-semibold text-lg px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none hover:transform hover:translate-y-[-4px] hover:translate-x-[-2px] hover:shadow-[2px_5px_0_0_black] active:transform active:translate-y-[2px] active:translate-x-[1px] active:shadow-none'
      >Chat</button>
    {!receiving &&
      listing.available &&
      <button
        type="button"
        onClick={handleFullfill}
        className='m-4 bg-secondary text-text rounded-full font-semibold text-lg px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none hover:transform hover:translate-y-[-4px] hover:translate-x-[-2px] hover:shadow-[2px_5px_0_0_black] active:transform active:translate-y-[2px] active:translate-x-[1px] active:shadow-none'
        >{fulfillButtonText}</button>}
      </div>
  </div>
}

export default OrderCard