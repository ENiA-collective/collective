const knex = require('../knex'); // Ensure this points to your Knex configuration file

class Listing {
  static async create(title, description, user_id, latitude, longitude, image_src) {
    const query = `
      INSERT INTO listings (title, description, user_id, location, image_src)
      VALUES (?, ?, ?, point(?, ?), ?)
      RETURNING *;
    `;

    const { rows } = await knex.raw(query, [
      title,
      description,
      user_id,
      latitude,
      longitude,
      image_src,
    ]);
    return rows[0];
  }

  // test with seed chatgpt it
  static async listAll() { // Get all
    const query = `
      SELECT * 
      FROM listings;
    `;
    const { rows } = await knex.raw(query);
    return rows;
  }

  // create list for all for specific users post
  static async findById(id) { // Get one
    const query = `
      SELECT * 
      FROM listings
      WHERE id=?
    `;
    const { rows } = await knex.raw(query, [id]);
    return rows[0];
  }

  static async delete(id) { // Delete
    const query = `
      DELETE FROM listings
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [id]);
    return rows[0]; // Returns the deleted listing
  }
  static async editPost(id, title, description) {
    const query = `
        UPDATE listings SET title = ?, description = ?
        WHERE id = ? RETURNING *;
    `;
    const { rows } = await knex.raw(query, [title, description, id]);
    return rows[0];
}
static async makeUnavailable(id) {
  const query = `
      UPDATE listings SET available = false
      WHERE id = ? RETURNING *;
  `;
  const { rows } = await knex.raw(query, [id]);
  return rows[0];
}
static async listAllFromCurrentUser(user_id) {
  const query = `
      SELECT * FROM listings WHERE user_id = ?;
  `;
  const { rows } = await knex.raw(query, [user_id]);
  return rows;
}
}

module.exports = Listing;
