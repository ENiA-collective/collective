import { useContext, useEffect, useState } from "react";
import { checkIfOrdered, createOrder } from "../../adapters/order-adapter";
import { updateCount } from "../../adapters/listing-adapter";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const RequestItem = ({ listing, setErrorText }) => {
  const { currentUser } = useContext(CurrentUserContext)
  const [count, setCount] = useState(0)
  const [buttonText, setButtonText] = useState(`Request Item - ${count} Request(s) Made`)
  const [disableButton, setDisableButton] = useState(true)
  
  useEffect(() => {
    if (listing.order_count === 0 || listing.order_count) {
      setCount(listing.order_count)
    }

    const checkIfUserOrdered = async () => {
      if (!listing.id) return
     const [isOrdered, error] = await checkIfOrdered(currentUser.id, listing.id)
     if(error) return setErrorText(error.message)
     setDisableButton(isOrdered)
      
    }
    checkIfUserOrdered()
    
  }, [listing])

  useEffect(() => {
    if (!count) return
    const incrementCount = async () => {
      const [updatedListing, error] = await updateCount(listing.id, count)
      if (error) setErrorText(error.message)
    }
    incrementCount()
  }, [count])

  useEffect(() => { 
    if (count === 0) return
    setButtonText(`Requested! - ${count} User(s) Requested`)
  }, [count, buttonText, disableButton])


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
    setButtonText(`Requested! handleclick - ${count} User(s) Requested`)
    setDisableButton(true)
  }

//implement a check to see if the user alr ordered the item

  return <button type="button" onClick={handleClick} disabled={disableButton}>{ buttonText }</button>
}

export default RequestItem;
