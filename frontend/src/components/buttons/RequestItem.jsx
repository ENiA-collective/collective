import { useContext, useEffect, useState } from "react";
import { createOrder } from "../../adapters/order-adapter";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const RequestItem = ({ listing, setErrorText }) => {
  const { currentUser } = useContext(CurrentUserContext)
  const [count, setCount] = (listing.order_count)
  const [buttonText, setButtonText] = useState(`Request Item - ${count} Request(s) Made`)
  
  useEffect(() => {
 //send patch req to increment count
  }, [buttonText])

  const handleClick = async () => {
    if (!currentUser) return setErrorText('Please log in or make an account to place an order.')
    setCount(prevCount => prevCount + 1)
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
  //request body needs
  //listing ID
  // original poster ID
  // current user ID
  return <button type="button" onClick={handleClick}>{ buttonText }</button>
}

export default RequestItem;
// to do - make this show the number of requests made per listing