import { useContext, useEffect, useState } from "react";
import { checkIfOrdered, createOrder } from "../../adapters/order-adapter";
import { updateCount } from "../../adapters/listing-adapter";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const RequestItem = ({ listing, setErrorText }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [count, setCount] = useState(0);
  const [buttonText, setButtonText] = useState(`Request Item - ${count} Request(s) Made`);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (listing.order_count === 0 || listing.order_count) {
      setCount(listing.order_count);
    }

    const checkIfUserOrdered = async () => {
      if (!listing.id) return;
      const [isOrdered, error] = await checkIfOrdered(currentUser.id, listing.id);
      if (error) return setErrorText(error.message);
      setDisableButton(isOrdered);
    };
    checkIfUserOrdered();
  }, [listing, currentUser, setErrorText]);

  useEffect(() => {
    if (!count) return;
    const incrementCount = async () => {
      const [updatedListing, error] = await updateCount(listing.id, count);
      if (error) setErrorText(error.message);
    };
    incrementCount();
  }, [count, listing.id, setErrorText]);

  useEffect(() => {
    if (count === 0) return;
    if (disableButton) return setButtonText(`Request Item - ${count} Request(s) Made`);
    setButtonText(`Requested! - ${count} User(s) Requested`);
  }, [count]);

  const handleClick = async () => {
    if (!currentUser) return setErrorText('Please log in or make an account to place an order.');
    setCount(prevCount => prevCount + 1);
    const orderDetails = {
      listing_id: listing.id,
      giver_user_id: listing.user_id,
      getter_user_id: currentUser.id,
    };
    const [order, error] = await createOrder(orderDetails);
    if (error) return setErrorText(error.message);
    setButtonText(`Requested! - ${count + 1} User(s) Requested handle click`);
    setDisableButton(true);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disableButton}
      className={`bg-secondary text-text rounded-full font-semibold text-lg px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none ${disableButton ? 'opacity-50 cursor-not-allowed' : 'hover:transform hover:translate-y-[-4px] hover:translate-x-[-2px] hover:shadow-[2px_5px_0_0_black] active:transform active:translate-y-[2px] active:translate-x-[1px] active:shadow-none'}`}
    >
      {buttonText}
    </button>
  );
};

export default RequestItem;
