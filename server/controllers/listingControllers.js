const Listing = require('../db/models/Listing');

// Create a listing
exports.createListing = async (req, res) => {
  const { title, description, user_id, latitude, longitude, image_src } =
    req.body;
  try {
    const listing = await Listing.create(
      title,
      description,
      user_id,
      latitude,
      longitude,
      image_src
    );
    res.send(listing);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// List all listings
exports.listAllListings = async (req, res) => {
  try {
    const listings = await Listing.listAll();
    res.send(listings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Find a listing by ID
exports.findListingById = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.sendStatus(404);
    }
    res.send(listing);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Delete a listing
exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Listing.delete(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Edit a listing
exports.editListing = async (req, res) => {
  const { id } = req.params;
  const { title, description, image_url } = req.body;
  const { userId } = req.session;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.sendStatus(404);
    }
    if (listing.user_id !== userId) {
      return res.sendStatus(403);
    }
    const updatedListing = await Listing.editPost(
      id,
      title,
      description,
      image_url
    );
    res.send(updatedListing);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Mark a listing as unavailable
exports.makeListingUnavailable = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedListing = await Listing.makeUnavailable(id);
    res.send(updatedListing);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// List all listings from a specific user
exports.listAllListingsFromUser = async (req, res) => {
  const { user_id } = req.params; // Ensure you're capturing this param correctly
  try {
    const listings = await Listing.listAllFromCurrentUser(user_id);
    res.send(listings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.incrementCount = async (req, res) => {
  const { id } = req.params;
  const { newCount } = req.body;
  try {
    const listing = await Listing.orderCounter(id, newCount);
    res.send(listing);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
