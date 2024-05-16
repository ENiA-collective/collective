import { fetchHandler, getPostOptions, getPatchOptions, deleteOptions } from "../utils";

const baseUrl = '/api/listings'


//note: uses implicit return
export const createListing = async ({ title, description, image_src, latitude, longitude, user_id }) => (
  fetchHandler(baseUrl, getPostOptions({ title, description, image_src, latitude, longitude, user_id }))
);

export const fetchListing = async (id) => (
  fetchHandler(`${baseUrl}/${id}`)
);

export const updateListing = async (id, data) => (
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions(data))
);

export const deleteListing = async (id) => (
  fetchHandler(`${baseUrl}/${id}`, deleteOptions())
);