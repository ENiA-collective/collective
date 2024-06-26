const express = require('express');
const listingRouter = express.Router();
const listingControllers = require('../controllers/listingControllers');
// Middleware to check if the user is authenticated
const checkAuthentication = require('../middleware/checkAuthentication');

//console.log(listingControllers); // Add this to check the imported object
//console.log(checkAuthentication); // Add this to check the middleware

listingRouter.post('/', checkAuthentication, listingControllers.createListing);
listingRouter.get('/', listingControllers.listAllListings);
listingRouter.get('/search/:search_term', listingControllers.listAllFromKeyword)
listingRouter.get('/:id', listingControllers.findListingById);

listingRouter.delete(
  '/:id',
  checkAuthentication,
  listingControllers.deleteListing
);
listingRouter.patch(
  '/:id',
  checkAuthentication,
  listingControllers.editListing
);
listingRouter.patch(
  '/:id/unavailable',
  checkAuthentication,
  listingControllers.makeListingUnavailable
);
listingRouter.patch(
  '/:id/count',
  checkAuthentication,
  listingControllers.incrementCount
);
listingRouter.get(
  '/user/:user_id',
  checkAuthentication,
  listingControllers.listAllListingsFromUser
);


module.exports = listingRouter;