import { fetchHandler, getPostOptions, getPatchOptions } from '../utils';

const baseUrl = '/api/orders';

export const createOrder = async ({
  listing_id,
  giver_user_id,
  getter_user_id,
}) =>
  fetchHandler(
    baseUrl,
    getPostOptions({ listing_id, giver_user_id, getter_user_id })
  );


export const checkIfOrdered = async (user_id, listing_id) =>
  fetchHandler(
    `${baseUrl}/check-if-ordered?userId=${user_id}&listingId=${listing_id}`
  );

export const getMyGifts = async (user_id) =>
  fetchHandler(`${baseUrl}/my-gifts/${user_id}`);

export const getMyOrders = async (user_id) =>
  fetchHandler(`${baseUrl}/my-orders/${user_id}`);

export const fulfillOrder = async (order_id) =>
  fetchHandler(`${baseUrl}/${order_id}`, getPatchOptions());

//todo:
//grab an order by id
