import {
  fetchHandler,
  getPostOptions,
  getPatchOptions,
  deleteOptions,
} from '../utils';

const baseUrl = '/api/listings';

//note: uses implicit return
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

const fetchListings = async () => {
  const [listings] = await fetchHandler(baseUrl);
  return listings || [];
};

export const getListing = async (id) => fetchHandler(`${baseUrl}/${id}`);

export const updateListing = async ({ id, title, description }) =>
  fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, title, description }));

export const deleteListing = async (id) =>
  fetchHandler(`${baseUrl}/${id}`, deleteOptions);

export default fetchListings;
