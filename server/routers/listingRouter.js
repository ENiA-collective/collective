const express = require('express');
const listingControllers = require('../controllers/listingControllers');
const checkAuthentication = require('../middleware/checkAuthentication');

const listingRouter = express.Router();

listingRouter.post('/', checkAuthentication, listingControllers.createListing);

module.exports = listingRouter;
