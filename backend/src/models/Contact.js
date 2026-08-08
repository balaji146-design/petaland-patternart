import { query } from "../config/db.js";

async function create(data) {
  try {
    const { name, mobile, email, message } = data;

    const result = await query(
      `INSERT INTO contacts (name, mobile, email, message, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING id, name, mobile, email, message, created_at`,
      [name, mobile, email, message]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to save contact message: ${error.message}`);
  }
}

async function getAll() {
  try {
    const result = await query(
      `SELECT id, name, mobile, email, message, created_at
       FROM contacts
       ORDER BY created_at DESC`
    );

    return result.rows;
  } catch (error) {
    throw new Error(`Failed to fetch contact messages: ${error.message}`);
  }
}

export default {
  create,
  getAll,
};