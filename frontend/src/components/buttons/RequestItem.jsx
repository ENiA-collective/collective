import { useContext, useEffect, useState } from "react";
import { createOrder } from "../../adapters/order-adapter";
import { updateCount } from "../../adapters/listing-adapter";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const RequestItem = ({ listing, setErrorText }) => {
  const { currentUser } = useContext(CurrentUserContext)
  const [count, setCount] = useState(0)
  const [buttonText, setButtonText] = useState(`Request Item - ${count} Request(s) Made`)
  
  useEffect(() => {
    if (listing.order_count === 0 || listing.order_count) {
      setCount(listing.order_count)
      console.log('useEffect', count)
    }
    
  }, [listing])

  useEffect(() => {
    if (!count) return
    const incrementCount = async () => {
      const [updatedListing, error] = await updateCount(listing.id, count)
      if (error) setErrorText(error.message)
      console.log('listing updated')
      console.log(count)
    }
    incrementCount()

    setButtonText(`Requested! - ${count} Other User(s) Requested`)
  }, [count])

  useEffect(() => { setButtonText(`Requested! - ${count} Other User(s) Requested`) }, [count, buttonText])


  const handleClick = async () => {
    if (!currentUser) return setErrorText('Please log in or make an account to place an order.')
    setCount(prevCount => prevCount + 1)
    console.log(count)
    const orderDetails = {
      listing_id: listing.id,
      giver_user_id: listing.user_id,
      getter_user_id: currentUser.id
    }
    const [order, error] = await createOrder(orderDetails)
    if(error) return setErrorText(error.message)
    setButtonText(`Requested! - ${count} Other User(s) Requested`)
  }

//implement a check to see if the user alr ordered the item

  return <button type="button" onClick={handleClick}>{ buttonText }</button>
}

export default RequestItem;
