import {
  fetchHandler,
  getPostOptions,
  getPatchOptions,
} from '../utils';

const baseUrl = '/api/orders';

export const createOrder = async ({ listing_id, giver_user_id, getter_user_id }) => (
  fetchHandler(baseUrl, getPostOptions({ listing_id, giver_user_id, getter_user_id }))
);

export const checkIfOrdered = async ({ user_id, listing_id }) => (
  fetchHandler(baseUrl, {body: JSON.stringify({user_id, listing_id})})
);
//todo:
//see all orders from specific users
//grab an order by id
//fulfill order