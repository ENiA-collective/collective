import { useContext, useEffect, useState } from "react";
<<<<<<< HEAD
import { createOrder } from "../../adapters/order-adapter";
=======
import { checkIfOrdered, createOrder } from "../../adapters/order-adapter";
>>>>>>> main
import { updateCount } from "../../adapters/listing-adapter";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const RequestItem = ({ listing, setErrorText }) => {
  const { currentUser } = useContext(CurrentUserContext)
  const [count, setCount] = useState(0)
  const [buttonText, setButtonText] = useState(`Request Item - ${count} Request(s) Made`)
<<<<<<< HEAD
=======
  const [disableButton, setDisableButton] = useState(true)
>>>>>>> main
  
  useEffect(() => {
    if (listing.order_count === 0 || listing.order_count) {
      setCount(listing.order_count)
<<<<<<< HEAD
      console.log('useEffect', count)
    }
=======
    }

    const checkIfUserOrdered = async () => {
      if (!listing.id) return
     const [isOrdered, error] = await checkIfOrdered(currentUser.id, listing.id)
     if(error) return setErrorText(error.message)
     setDisableButton(isOrdered)
      
    }
    checkIfUserOrdered()
>>>>>>> main
    
  }, [listing])

  useEffect(() => {
    if (!count) return
    const incrementCount = async () => {
      const [updatedListing, error] = await updateCount(listing.id, count)
      if (error) setErrorText(error.message)
<<<<<<< HEAD
      console.log('listing updated')
      console.log(count)
    }
    incrementCount()

    setButtonText(`Requested! - ${count} Other User(s) Requested`)
  }, [count])

  useEffect(() => { setButtonText(`Requested! - ${count} Other User(s) Requested`) }, [count, buttonText])
=======
    }
    incrementCount()

    setButtonText(`Requested! - ${count} User(s) Requested`)
  }, [count])

  useEffect(() => { setButtonText(`Requested! - ${count} User(s) Requested`) }, [count, buttonText, disableButton])
>>>>>>> main


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
<<<<<<< HEAD
    setButtonText(`Requested! - ${count} Other User(s) Requested`)
=======
    setButtonText(`Requested! - ${count} User(s) Requested`)
    setDisableButton(true)
>>>>>>> main
  }

//implement a check to see if the user alr ordered the item

<<<<<<< HEAD
  return <button type="button" onClick={handleClick}>{ buttonText }</button>
=======
  return <button type="button" onClick={handleClick} disabled={disableButton}>{ buttonText }</button>
>>>>>>> main
}

export default RequestItem;
