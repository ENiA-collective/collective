const express = require('express');
const listingRouter = express.Router();
const listingControllers = '../controllers/listingControllers';
// Middleware to check if the user is authenticated
const { checkAuthentication } = require('../middleware/checkAuthentication');

console.log(listingControllers); // Add this to check the imported object
console.log(checkAuthentication); // Add this to check the middleware

listingRouter.post('/', checkAuthentication, listingControllers.createListing);
listingRouter.get('/', listingControllers.listAllListings);
listingRouter.get('/:id', listingControllers.findListingById);
listingRouter.delete(
  '/:id',
  checkAuthentication,
  listingControllers.deleteListing
);
listingRouter.put('/:id', checkAuthentication, listingControllers.editListing);
listingRouter.put(
  '/:id/unavailable',
  checkAuthentication,
  listingControllers.makeListingUnavailable
);
listingRouter.get('/user/:user_id', listingControllers.listAllListingsFromUser);

module.exports = listingRouter;
