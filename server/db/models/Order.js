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
    SET fulfilled=true, updated_at=?
    WHERE id=?
    RETURNING *
    `;

    const timestamp = knex.fn.now()
    const { rows } = await knex.raw(query, [timestamp, id]);
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

  static async checkIfUserOrdered(user_id, listing_id) {
    const query = `
      SELECT *
      FROM orders
      WHERE getter_user_id = ? AND listing_id = ?
      `
    const { rows } = await knex.raw(query, [user_id, listing_id])
    return !!(rows.length) // will return 'true' if a match was found, and 'false' if there is no match
  }

  static async findById(id) {
    const query = `
      SELECT * 
      FROM orders
      WHERE id=?
      `;
    
    const { rows } = await knex.raw(query, [id]);
    return rows[0]
  }

  static async listMyOrders(getter_user_id) {
    const query = `
      SELECT *
      FROM orders
      WHERE getter_user_id=?
      ORDER BY created_at DESC
      `;

    const { rows } = await knex.raw(query, [getter_user_id]);
    return rows;
  }

  static async listMyGifts(giver_user_id) {
    const query = `
    SELECT *
    FROM orders
    WHERE giver_user_id=?
    ORDER BY created_at DESC
    `;

    const { rows } = await knex.raw(query, [giver_user_id]);
    return rows;
  }
}

module.exports = Order;
