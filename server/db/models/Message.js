const knex = require("../knex")

class Message {
	static async create(order_id, sender_id, message) {
		const query = `
    INSERT INTO messages (order_id, sender_id, message)
    VALUES (?, ?, ?)
    RETURNING *;
    `
		const { rows } = await knex.raw(query, [order_id, sender_id, message])
		const msg = rows[0]

		return msg
	}

	static async listConvo(order_id) {
		const query = `
    SELECT *
    FROM messages
    WHERE order_id = ?
    ORDER BY created_at ASC;
    `
		const { rows } = await knex.raw(query, [order_id])
		return rows
	}
}


module.exports = Message

