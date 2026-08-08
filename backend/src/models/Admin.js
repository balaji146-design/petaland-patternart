// import { query } from "../config/db.js";

// async function findByEmail(email) {
//   try {
//     const result = await query(
//       "SELECT id, name, email, password, avatar_url, created_at, updated_at FROM admins WHERE email = $1 LIMIT 1",
//       [email.toLowerCase().trim()]
//     );

//     return result.rows[0] || null;
//   } catch (error) {
//     throw new Error(`Failed to find admin by email: ${error.message}`);
//   }
// }

// async function findById(id) {
//   try {
//     const result = await query(
//       "SELECT id, name, email, avatar_url, created_at, updated_at FROM admins WHERE id = $1 LIMIT 1",
//       [id]
//     );

//     return result.rows[0] || null;
//   } catch (error) {
//     throw new Error(`Failed to find admin by id: ${error.message}`);
//   }
// }

// async function updateProfile(id, data) {
//   try {
//     const { name, avatarUrl } = data;

//     const result = await query(
//       `UPDATE admins
//        SET name = COALESCE($1, name),
//            avatar_url = COALESCE($2, avatar_url),
//            updated_at = NOW()
//        WHERE id = $3
//        RETURNING id, name, email, avatar_url, created_at, updated_at`,
//       [name || null, avatarUrl || null, id]
//     );

//     if (result.rows.length === 0) {
//       const error = new Error("Admin not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     return result.rows[0];
//   } catch (error) {
//     throw error;
//   }
// }

// export default {
//   findByEmail,
//   findById,
//   updateProfile,
// };

import { query } from "../config/db.js";

async function findByEmail(email) {
  try {
    const result = await query(
      `SELECT
        id,
        full_name,
        email,
        password,
        profile_image,
        created_at,
        updated_at
      FROM admins
      WHERE email = $1
      LIMIT 1`,
      [email.toLowerCase().trim()]
    );

    return result.rows[0] || null;
  } catch (error) {
    throw new Error(`Failed to find admin by email: ${error.message}`);
  }
}

async function findById(id) {
  try {
    const result = await query(
      `SELECT
        id,
        full_name,
        email,
        profile_image,
        created_at,
        updated_at
      FROM admins
      WHERE id = $1
      LIMIT 1`,
      [id]
    );

    return result.rows[0] || null;
  } catch (error) {
    throw new Error(`Failed to find admin by id: ${error.message}`);
  }
}

async function updateProfile(id, data) {
  try {
    const { full_name, profile_image } = data;

    const result = await query(
      `UPDATE admins
       SET full_name = COALESCE($1, full_name),
           profile_image = COALESCE($2, profile_image),
           updated_at = NOW()
       WHERE id = $3
       RETURNING
         id,
         full_name,
         email,
         profile_image,
         created_at,
         updated_at`,
      [full_name || null, profile_image || null, id]
    );

    if (result.rows.length === 0) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      throw error;
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export default {
  findByEmail,
  findById,
  updateProfile,
};