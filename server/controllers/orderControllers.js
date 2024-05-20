const Order = require('../db/models/Order');

// Create an order
exports.createOrder = async (req, res) => {
  const { giver_user_id, getter_user_id, listing_id } = req.body;
  try {
    const order = await Order.create(giver_user_id, getter_user_id, listing_id);
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Fulfill an order
exports.fulfillOrder = async (req, res) => {
  const { id } = req.params; // this might have to be changed to req.body but it is 100% dependent on our frontend structure
  try {
    const order = await Order.fulfill(id);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.send(order);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// List all orders
exports.listAllOrders = async (req, res) => {
  try {
    const orders = await Order.list();
    res.send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.checkIfOrderedByUser = async (req, res) => {

  const { userId, listingId } = req.query;
  try {
    const orders = await Order.checkIfUserOrdered(userId, listingId);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    res.send(order);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// List orders by getter user ID
exports.listMyOrders = async (req, res) => {
  const { getter_user_id } = req.params;

  try {
    const orders = await Order.listMyOrders(getter_user_id);
    res.send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }

};

// List orders by giver user ID
exports.listMyGifts = async (req, res) => {
  const { giver_user_id } = req.params;

  try {
    const gifts = await Order.listMyGifts(giver_user_id);
    res.send(gifts);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

