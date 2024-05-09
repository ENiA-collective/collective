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
    table.timestamps(true, true); // makes a created at and updated at column
    table.point('location');
    table.string('image_url');
  })
  .createTable('orders', (table) => {
    table.increments('id').primary();
    table.integer('getter_user_id').notNullable();
    table.foreign('getter_user_id').references('id').inTable('users');
    table.integer('giver_user_id').notNullable();
    table.foreign('giver_user_id').references('id').inTable('users');
    table.integer('listing_id').notNullable();
    table.foreign('listing_id').references('id').inTable('listings');
    table.timestamp('order_time').defaultTo(knex.fn.now());
    table.boolean('fulfilled').defaultTo(false);
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('orders')
  .dropTable('listings')
  .dropTable('users');
