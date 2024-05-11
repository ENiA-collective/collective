import { fetchHandler, getPostOptions, getPatchOptions, deleteOptions } from "../utils";

const baseUrl = '/api/listings'

export const createListing = async ({ title, description, image_src, latitude, longitude, user_id }) => {
  fetchHandler(baseUrl, getPostOptions({title, description, image_src, latitude, longitude, user_id}))
}