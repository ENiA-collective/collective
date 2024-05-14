const express = require('express');
const listingRouter = express.Router();
const listingsControllers = require('../controllers/listingsControllers');

// Middleware to check if the user is authenticated
const { checkAuthentication } = require('../middleware/checkAuthentication');

console.log(listingsControllers); // Add this to check the imported object
console.log(checkAuthentication); // Add this to check the middleware

listingRouter.post('/', checkAuthentication, listingsControllers.createListing);
listingRouter.get('/', listingsControllers.listAllListings);
listingRouter.get('/:id', listingsControllers.findListingById);
listingRouter.delete('/:id', checkAuthentication, listingsControllers.deleteListing);
listingRouter.put('/:id', checkAuthentication, listingsControllers.editListing);
listingRouter.put('/:id/unavailable', checkAuthentication, listingsControllers.makeListingUnavailable);
listingRouter.get('/user/:user_id', listingsControllers.listAllListingsFromUser);

module.exports = listingRouter;
