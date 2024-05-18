const express = require('express');
const orderControllers = require('../controllers/orderControllers')
const checkAuthentication  = require('../middleware/checkAuthentication');

const orderRouter = express.Router();

orderRouter.get('/', checkAuthentication, orderControllers.listAllOrders);
orderRouter.post('/', checkAuthentication, orderControllers.createOrder);
orderRouter.get('/:id', checkAuthentication, orderControllers.getById);
orderRouter.patch('/:id', checkAuthentication, orderControllers.fulfillOrder);
orderRouter.get('/my-orders', checkAuthentication, orderControllers.listMyOrders);
orderRouter.get('/my-gifts', checkAuthentication, orderControllers.listMyGifts);
orderRouter.get('/check-if-ordered', checkAuthentication, orderControllers.checkIfOrderedByUser )

module.exports = orderRouter;

