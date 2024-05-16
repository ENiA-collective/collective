/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id').primary();
  table.string('username').notNullable().unique();
  table.string('display_name');
  table.string('pronouns');
  table.string('bio');
  table.string('password_hash').notNullable();
  table.string('pfp_src').notNullable();
  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.boolean('is_admin').defaultTo(false);
})
  .createTable('listings', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable(); // tell epi
    table.string('description');
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');
    table.boolean('available').defaultTo(true);
    table.timestamps(true, true); // makes a created_at and updated_at column
    table.point('location');
    table.string('image_src');
  })
  .createTable('orders', (table) => {
    table.increments('id').primary();
    table.integer('getter_user_id').notNullable();
    table.foreign('getter_user_id').references('id').inTable('users');
    table.integer('giver_user_id').notNullable();
    table.foreign('giver_user_id').references('id').inTable('users');
    table.integer('listing_id').notNullable();
    table.foreign('listing_id').references('id').inTable('listings');
    table.timestamps(true, true)
    table.boolean('fulfilled').defaultTo(false);
  })
  .createTable('messages', (table) => {
    table.increments('id').primary();
    table.integer('order_id').notNullable();
    table.foreign('order_id').references('id').inTable('orders');
    table.integer('sender_id').notNullable();
    table.foreign('sender_id').references('id').inTable('users');
    table.string('message').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('messages')
  .dropTable('orders')
  .dropTable('listings')
  .dropTable('users');
