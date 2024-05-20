import { fetchHandler, getPostOptions } from "../utils";

const baseUrl = 'api/messages';

export const sendMessage = async (order_id, sender_id, message) => (
  fetchHandler(`${baseUrl}`, getPostOptions({order_id, sender_id, message}))
);

export const getConvo = async (order_id) => (
  fetchHandler(`${baseUrl}/${order_id}`)
);