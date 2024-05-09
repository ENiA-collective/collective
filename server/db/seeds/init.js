const User = require('../models/User');
const Listing = require('../models/Listing');
const Order = require('../models/Order');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex('orders').del();
  await knex('listings').del();
  await knex('users').del();

  await knex.raw('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE listings_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');

  await User.create('cheeseburger', 'password1', 'User One', 'they/them', '');
  await User.create('user2', 'password2', 'User Two', 'she/her', 'path/to/pfp2.jpg');
  await User.create('user3', 'password3', 'User Three', 'he/him', 'path/to/pfp3.jpg');
  await User.create('user4', 'password4', 'User Four', 'they/them', 'path/to/pfp4.jpg');
  await User.create('user5', 'password5', 'User Five', 'she/her', 'path/to/pfp5.jpg');
  await User.create('user6', 'password6', 'User Six', 'he/him', 'path/to/pfp6.jpg');
  await User.create('user7', 'password7', 'User Seven', 'they/them', 'path/to/pfp7.jpg');

  await Listing.create('Phaser Pistol', 'A powerful hand weapon for self-defense.', 3, 34.05, -118.24, 'http://example.com/phaser.jpg');
  await Listing.create('Communicator', 'Stay connected across the galaxy!', 4, 40.71, -74.01, 'http://example.com/communicator.jpg');
  await Listing.create('Holodeck Reservation', 'Escape to any destination of your choice.', 5, 34.05, -118.24, 'http://example.com/holodeck.jpg');
  await Listing.create('Replicator Module', 'Create anything you desire with a touch.', 6, 40.71, -74.01, 'http://example.com/replicator.jpg');
  await Listing.create('Starfleet Uniform', 'Join the ranks of Starfleet!', 7, 34.05, -118.24, 'http://example.com/uniform.jpg');

  await Order.create(1, 5, 3);
  await Order.create(2, 4, 2);
  await Order.create(3, 6, 4);
};
