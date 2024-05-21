const User = require('../models/User');
const Listing = require('../models/Listing');
const Order = require('../models/Order');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex('messages').del()
  await knex('orders').del();
  await knex('listings').del();
  await knex('users').del();

  await knex.raw('ALTER SEQUENCE messages_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE listings_id_seq RESTART WITH 1');
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');


  await User.create('cheeseburger', 'cheeseburger', 'Beese Churger', 'they/them', '');
  await User.create('nicole', 'nicole', 'Nicole!!', 'she/her', 'https://ca.slack-edge.com/TKZN62HDF-U05P4B24RTJ-ea65cd513e5d-512');
  await User.create('aleoto', 'al', 'aleleoto', 'she/they', 'https://fox4kc.com/wp-content/uploads/sites/16/2023/06/Worlds-Largest-Rubber-Duck.jpg?w=661');
  await User.create('epi', 'epi', 'Epi <3', 'she/her', 'https://fox4kc.com/wp-content/uploads/sites/16/2023/06/Worlds-Largest-Rubber-Duck.jpg?w=661');
  await User.create('alpartner', 'password5', 'User Five', 'she/her', 'https://fox4kc.com/wp-content/uploads/sites/16/2023/06/Worlds-Largest-Rubber-Duck.jpg?w=661');
  await User.create('u', 'password6', 'User Six', 'he/him', 'https://fox4kc.com/wp-content/uploads/sites/16/2023/06/Worlds-Largest-Rubber-Duck.jpg?w=661');
  await User.create('user7', 'password7', 'User Seven', 'they/them', 'https://fox4kc.com/wp-content/uploads/sites/16/2023/06/Worlds-Largest-Rubber-Duck.jpg?w=661');

  await Listing.create('Phaser Pistol', 'A powerful hand weapon for self-defense.', 3, 34.05, -118.24, 'https://i5.walmartimages.com/asr/d7731457-cabd-471e-bc4a-177225cbd3e8.b951330e628b23188f906cfe34c8e277.png?odnHeight=768&odnWidth=768&odnBg=FFFFFF');
  await Listing.create('Communicator', 'Stay connected across the galaxy!', 4, 40.71, -74.01, 'https://thumbs.dreamstime.com/z/alien-listening-to-radio-imaginative-radio-world-radio-day-generative-ai-alien-listening-to-radio-imaginative-radio-world-267056408.jpg');
  await Listing.create('Holodeck Reservation', 'Escape to any destination of your choice.', 5, 34.05, -118.24, 'https://mybasketballteacher.com/wp-content/uploads/2023/02/The-Holodeck.jpg');
  await Listing.create('Replicator Module', 'Create anything you desire with a touch.', 6, 40.71, -74.01, 'https://cdna.artstation.com/p/assets/images/images/042/780/200/large/md-waziullah-apu-sci-fi-tube-01.jpg?1635417358');
  await Listing.create('Starfleet Uniform', 'Join the ranks of Starfleet!', 7, 34.05, -118.24, 'https://images-na.ssl-images-amazon.com/images/I/51OKh82wAoL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg');

  await Order.create(1, 5, 3);
  await Order.create(2, 4, 2);
  await Order.create(3, 6, 4);
};