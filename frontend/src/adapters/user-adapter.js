// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = '/api/users';

export const createUser = async ({ username, password, display_name, pronouns, pfp_src }) => (
  fetchHandler(baseUrl, getPostOptions({ username, password, display_name, pronouns, pfp_src }))
);

export const getAllUsers = async () => {
  const [users] = await fetchHandler(baseUrl);
  return users || [];
};

export const getUser = async (id) => {
  if (!id) return [{username: ''}]
  return fetchHandler(`${baseUrl}/${id}`)
};

export const updateUsername = async ({ id, username }) => (
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }))
);
export const updateUser = async (id, data) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions(data));
};