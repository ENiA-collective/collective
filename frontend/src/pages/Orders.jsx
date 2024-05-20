import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";

// this is the same page but some information changes depending on who is receiving the items. is it the current user or another user?
const Orders = ({receiving}) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const loadOrders = () => {
    //  const [fetchedOrders, error] = 
    }
    loadOrders()
  }, [])

  return <>
    <h1>Orders: {receiving ? 'Receiving' : 'Giving'}</h1>
    <ul>
      { orders.map((order) => (
        <li key={order.id}>
          <OrderCard order={order}/>
        </li>
      )) }
    </ul>
  </>
}

export default Orders;