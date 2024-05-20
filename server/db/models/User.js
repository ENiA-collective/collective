const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class User {
  #passwordHash = null; // a private property

  // This constructor is NOT how a controller creates a new user in the database.
  // Instead, it is used by each of the User static methods to hide the hashed
  // password of users before sending user data to the client. Since #passwordHash
  // is private, only the isValidPassword instance method can access that value.
  constructor({ id, username, display_name, pronouns, password_hash, pfp_src, created_at }) {
    this.id = id;
    this.username = username;
    this.display_name = display_name;
    this.pronouns = pronouns;
    this.#passwordHash = password_hash;
    this.bio = '';
    this.pfp_src = pfp_src; // || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLTeg_bOJsXMkmRDM-YKCtqy91t0Way8KP99OFb53AA&s' should be unecessary as this is handled in the create() method
    this.is_admin = this.username === 'cheeseburger';
    this.created_at = created_at;
  }

  
  isValidPassword = async (password) => (
    authUtils.isValidPassword(password, this.#passwordHash)
  );

  static async create(username, password, display_name, pronouns, pfp_src) {
    
    const passwordHash = await authUtils.hashPassword(password);
    const is_admin = username === 'cheeseburger';
    const profilePicSrc = pfp_src || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLTeg_bOJsXMkmRDM-YKCtqy91t0Way8KP99OFb53AA&s';

    const query = `
      INSERT INTO users (username, password_hash, display_name, pronouns, pfp_src, is_admin)
      VALUES (?, ?, ?, ?, ?, ?)
      RETURNING *
      `;
    const { rows } = await knex.raw(query, [
      username,
      passwordHash,
      display_name,
      pronouns,
      profilePicSrc,
      is_admin]);
    const user = rows[0];
    return new User(user);
  }

  static async list() {
    const query = `SELECT * FROM users`;
    const { rows } = await knex.raw(query);
    return rows.map((user) => new User(user));
  }

  static async find(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const { rows } = await knex.raw(query, [username]);
    const user = rows[0];
    return user ? new User(user) : null;
  }


  static async editUser(id, display_name, pronouns, bio) {
    const query = `
      UPDATE users
      SET display_name=?, pronouns=?, bio=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [display_name, pronouns, bio, id]);
    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  }

  static async deleteAll() {
    return knex('users').del();
  }
}

module.exports = User;