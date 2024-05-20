import {
  fetchHandler,
  getPostOptions,
  getPatchOptions,
  deleteOptions,
} from '../utils';

const baseUrl = '/api/listings';

// Create a listing
export const createListing = async ({
  title,
  description,
  image_src,
  latitude,
  longitude,
  user_id,
}) =>
  fetchHandler(
    baseUrl,
    getPostOptions({
      title,
      description,
      image_src,
      latitude,
      longitude,
      user_id,
    })
  );

// Fetch a single listing by ID
export const fetchListing = async (id) => fetchHandler(`${baseUrl}/${id}`);

// Update a listing
export const updateListing = async (id, data) =>
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions(data));

// Delete a listing
export const deleteListing = async (id) =>
  fetchHandler(`${baseUrl}/${id}`, deleteOptions);

// Fetch all listings
export const fetchListings = async () => {
  const [listings, error] = await fetchHandler(baseUrl);
  if (error) console.log(error); // Print the error for simplicity.
  return listings || [];
};

export const getListing = async (id) => fetchHandler(`${baseUrl}/${id}`);

// track how many users have placed an order on an item
export const updateCount = async (id, newCount) =>
  fetchHandler(`${baseUrl}/${id}/count`, getPatchOptions({ id, newCount }));

export const makeUnavailable = async (id) =>
  fetchHandler(`${baseUrl}/${id}/unavailable`, getPatchOptions());

// Fetch listings by user

export const fetchListingsByUser = async (user_id) => {
  const [listings, error] = await fetchHandler(`${baseUrl}/user/${user_id}`);
  if (error) console.log(error);
  return listings || [];
};

export default fetchListings;
