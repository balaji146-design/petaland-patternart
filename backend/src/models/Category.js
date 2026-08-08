// import { query } from "../config/db.js";

// async function getAll() {
//   try {
//     const result = await query(
//       `SELECT id, name, image_url, created_at, updated_at
//        FROM categories
//        ORDER BY name ASC`
//     );

//     return result.rows;
//   } catch (error) {
//     throw new Error(`Failed to fetch categories: ${error.message}`);
//   }
// }

// async function getById(id) {
//   try {
//     const result = await query(
//       `SELECT id, name, image_url, created_at, updated_at
//        FROM categories WHERE id = $1 LIMIT 1`,
//       [id]
//     );

//     return result.rows[0] || null;
//   } catch (error) {
//     throw new Error(`Failed to fetch category: ${error.message}`);
//   }
// }

// export default {
//   getAll,
//   getById,
// };


import { query } from "../config/db.js";

async function getAll() {
  try {
    const result = await query(
      `SELECT id, name, image, description, created_at, updated_at
       FROM categories
       ORDER BY name ASC`
    );

    return result.rows;
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
}

async function getById(id) {
  try {
    const result = await query(
      `SELECT id, name, image, description, created_at, updated_at
       FROM categories WHERE id = $1 LIMIT 1`,
      [id]
    );

    return result.rows[0] || null;
  } catch (error) {
    throw new Error(`Failed to fetch category: ${error.message}`);
  }
}

export default {
  getAll,
  getById,
};