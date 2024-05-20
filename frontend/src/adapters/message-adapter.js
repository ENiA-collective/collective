import { fetchHandler, getPostOptions } from "../utils";

const baseUrl = 'api/messages';

export const sendMessage = async (order_id, sender_id, message) => (
  fetchHandler(`${baseUrl}`, getPostOptions({order_id, sender_id, message}))
);

export const getConvo = async (order_id) => {
  const [conversation, error] = await fetchHandler(`${baseUrl}/${order_id}`);
  if (error) console.log(error)
  return conversation || [];
};