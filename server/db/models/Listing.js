const knex = require('./knex'); // Ensure this points to your Knex configuration file

class Listing {

  static async create(title, description, user_id, available, location, image_url) {
    const query = `
      INSERT INTO listings (title, description, user_id, available, location, image_url)
      VALUES (?, ?, ?, ?, point(?, ?), ?)
      RETURNING *;
    `;
    const locationCoords = location.split(', '); // Expecting location as a "lat, long" string
    const { rows } = await knex.raw(query, [title, description, user_id, available, locationCoords[0], locationCoords[1], image_url]);
    return rows[0];
  }
//test with seed chatgpt it 
  static async list() { // Get all
    const query = `
      SELECT * 
      FROM listings;
    `;
    const { rows } = await knex.raw(query);
    return rows;
  }

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

  static async deleteAllListingsForUser(user_id) { // Delete all listings for a user
    const query = `
      DELETE FROM listings
      WHERE user_id = ?
    `;
    await knex.raw(query, [user_id]);
  }
}

module.exports = Listing;
