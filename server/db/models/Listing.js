const knex = require('./knex'); // Ensure this points to your Knex configuration file

class Listing {

  static async create(title, description, user_id, latitude, longitude, image_url) {
    const query = `
      INSERT INTO listings (title, description, user_id, latitude, longitude, image_url)
      VALUES (?, ?, ?, point(?, ?), ?)
      RETURNING *;
    `;
    const locationCoords = location.split(', '); // Expecting location as a "lat, long" string
    const { rows } = await knex.raw(query, [title, description, user_id, latitude, longitude, image_url]);
    return rows[0];
  }
//test with seed chatgpt it 
  static async listAll() { // Get all
    const query = `
      SELECT * 
      FROM listings;
    `;
    const { rows } = await knex.raw(query);
    return rows;
  }
//create list for all for specific users post 
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


}

module.exports = Listing;
