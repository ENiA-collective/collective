const express = require('express');
const orderControllers = require('../controllers/orderControllers');
const checkAuthentication = require('../middleware/checkAuthentication');

const orderRouter = express.Router();

orderRouter.get('/', checkAuthentication, orderControllers.listAllOrders);
orderRouter.post('/', checkAuthentication, orderControllers.createOrder);
orderRouter.get('/check-if-ordered', orderControllers.checkIfOrderedByUser);

orderRouter.get(
  '/my-orders/:getter_user_id',
  checkAuthentication,
  orderControllers.listMyOrders
);
orderRouter.get(
  '/my-gifts/:giver_user_id',
  checkAuthentication,
  orderControllers.listMyGifts
); //ORDER MATTERS! do not change the order of these...

orderRouter.get('/:id', checkAuthentication, orderControllers.getById);
orderRouter.patch('/:id', checkAuthentication, orderControllers.fulfillOrder);

module.exports = orderRouter;
