const knex = require('../knex');

class Order {
  static async create(giver_user_id, getter_user_id, listing_id) {
    const query = `
      INSERT INTO orders (giver_user_id, getter_user_id, listing_id)
      VALUES(?, ?, ?) RETURNING *`;

    const { rows } = await knex.raw(query, [giver_user_id, getter_user_id, listing_id]);
    return rows[0];
  }

  static async fulfill(id) {
    const query = `
    UPDATE orders
    SET fulfilled=true
    WHERE id=?
    RETURNING *
    `;

    const { rows } = await knex.raw(query, [id]);
    const fulfilledOrder = rows[0];
    return fulfilledOrder || null;
  }

  static async list() {
    const query = `
      SELECT *
      FROM orders
      `;

    const { rows } = await knex.raw(query);
    return rows;
  }

  static async listMyOrders(getter_user_id) {
    const query = `
      SELECT *
      FROM orders
      WHERE id=?
      `;

    const { rows } = await knex.raw(query, [getter_user_id]);
    return rows;
  }

  static async listMyGifts(giver_user_id) {
    const query = `
    SELECT *
    FROM orders
    WHERE id=?`;

    const { rows } = await knex.raw(query, [giver_user_id]);
    return rows;
  }
}

module.exports = Order;
