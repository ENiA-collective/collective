const User = require('../models/User');
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

  // Insert users and extract IDs
  const userInserts = await knex('users').insert([
    { username: 'worf123', display_name: 'Worf', password_hash: 'password123', pfp_src: 'http://example.com/worf.jpg', is_admin: false },
    { username: 'janeway456', display_name: 'Kathryn', password_hash: 'password456', pfp_src: 'http://example.com/Kathryn.jpg', is_admin: true }
  ]).returning('id');
//we are gonna have to change the hash
  // Extract IDs from the insert results
  const userIds = userInserts.map(row => row.id);

  // Insert listings using the extracted user IDs
  const listingsInserts = await knex('listings').insert([
    { title: 'Type 1 Phaser', description: 'Perfect for any home.', user_id: userIds[0], available: true, location: knex.raw('point(34.05, -118.24)'), image_url: 'http://example.com/table.jpg' },
    { title: 'Tricorder', description: 'A Multifunctional handheld device which can be used to sensor scan an environment or individual and record data for analysis', user_id: userIds[1], available: false, location: knex.raw('point(40.71, -74.01)'), image_url: 'http://example.com/painting.jpg' }
  ]).returning('id');

  // Extract IDs from the insert results
  const listingIds = listingsInserts.map(row => row.id);

  // Insert orders using the extracted listing IDs and user IDs
  await knex('orders').insert([
    { getter_user_id: userIds[1], giver_user_id: userIds[0], listing_id: listingIds[0], order_time: knex.fn.now(), fulfilled: true },
    { getter_user_id: userIds[0], giver_user_id: userIds[1], listing_id: listingIds[1], order_time: knex.fn.now(), fulfilled: false }
  ]);
};