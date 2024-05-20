import { useEffect, useState, useContext } from "react";
import OrderCard from "../components/OrderCard";
import { getMyGifts, getMyOrders } from "../adapters/order-adapter";
import CurrentUserContext from "../contexts/CurrentUserContext";

// this is the same page but some information changes depending on who is receiving the items. is it the current user or another user?
const Orders = ({receiving}) => {
  const [orders, setOrders] = useState([])
  const [errorText, setErrorText] = useState('')
 
  const { currentUser } = useContext(CurrentUserContext)
  const fetchFunction = receiving ? getMyOrders : getMyGifts
  useEffect(() => {
    const loadOrders = async () => {
      const [fetchedOrders, error] = await fetchFunction(currentUser.id)
      if (error) return setErrorText(error.message)
      setOrders(fetchedOrders)
    }
    loadOrders();
  }, [])

  return <>
    <h1>Orders: {receiving ? 'Receiving' : 'Giving'}</h1>
    {errorText && <p>{errorText}</p>}
    <ul>
      { orders.map((order) => (
        <li key={order.id}>
          <OrderCard order={order} receiving={receiving} setErrorText={setErrorText} />
        </li>
      )) }
    </ul>
  </>
}

export default Orders;