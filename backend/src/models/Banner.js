// import { query } from "../config/db.js";

// async function getCurrent() {
//   try {
//     const result = await query(
//       `SELECT id, title, subtitle, image_url, is_active, created_at, updated_at
//        FROM banners
//        WHERE is_active = true
//        ORDER BY created_at DESC
//        LIMIT 1`
//     );

//     return result.rows[0] || null;
//   } catch (error) {
//     throw new Error(`Failed to fetch current banner: ${error.message}`);
//   }
// }

// async function create(data) {
//   try {
//     const { title, subtitle, imageUrl, isActive = true } = data;

//     const result = await query(
//       `INSERT INTO banners (title, subtitle, image_url, is_active, created_at, updated_at)
//        VALUES ($1, $2, $3, $4, NOW(), NOW())
//        RETURNING id, title, subtitle, image_url, is_active, created_at, updated_at`,
//       [title || null, subtitle || null, imageUrl, isActive]
//     );

//     return result.rows[0];
//   } catch (error) {
//     throw new Error(`Failed to create banner: ${error.message}`);
//   }
// }

// async function update(id, data) {
//   try {
//     const { title, subtitle, imageUrl, isActive } = data;

//     const result = await query(
//       `UPDATE banners
//        SET title = COALESCE($1, title),
//            subtitle = COALESCE($2, subtitle),
//            image_url = COALESCE($3, image_url),
//            is_active = COALESCE($4, is_active),
//            updated_at = NOW()
//        WHERE id = $5
//        RETURNING id, title, subtitle, image_url, is_active, created_at, updated_at`,
//       [title || null, subtitle || null, imageUrl || null, isActive ?? null, id]
//     );

//     if (result.rows.length === 0) {
//       const error = new Error("Banner not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     return result.rows[0];
//   } catch (error) {
//     throw error;
//   }
// }

// async function deleteById(id) {
//   try {
//     const result = await query(
//       "DELETE FROM banners WHERE id = $1 RETURNING id, image_url",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       const error = new Error("Banner not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     return result.rows[0];
//   } catch (error) {
//     throw error;
//   }
// }

// export default {
//   getCurrent,
//   create,
//   update,
//   delete: deleteById,
// };

// import { query } from "../config/db.js";

// async function getCurrent() {
//   try {
//     const result = await query(
//       `SELECT id, title, subtitle, image, is_active, created_at, updated_at
//        FROM banners
//        WHERE is_active = true
//        ORDER BY created_at DESC
//        LIMIT 1`
//     );

//     return result.rows[0] || null;
//   } catch (error) {
//     throw new Error(`Failed to fetch current banner: ${error.message}`);
//   }
// }

// async function getAll() {
//   try {
//     const result = await query(
//       `SELECT id, title, subtitle, image, is_active, created_at, updated_at
//        FROM banners
//        ORDER BY created_at DESC`
//     );

//     return result.rows;
//   } catch (error) {
//     throw new Error(`Failed to fetch banners: ${error.message}`);
//   }
// }

// async function create(data) {
//   try {
//     const { title, subtitle, image, isActive = true } = data;

//     const result = await query(
//       `INSERT INTO banners (title, subtitle, image, is_active, created_at, updated_at)
//        VALUES ($1, $2, $3, $4, NOW(), NOW())
//        RETURNING id, title, subtitle, image, is_active, created_at, updated_at`,
//       [title || null, subtitle || null, image, isActive]
//     );

//     return result.rows[0];
//   } catch (error) {
//     throw new Error(`Failed to create banner: ${error.message}`);
//   }
// }

// async function update(id, data) {
//   try {
//     const { title, subtitle, image, isActive } = data;

//     const result = await query(
//       `UPDATE banners
//        SET title = COALESCE($1, title),
//            subtitle = COALESCE($2, subtitle),
//            image = COALESCE($3, image),
//            is_active = COALESCE($4, is_active),
//            updated_at = NOW()
//        WHERE id = $5
//        RETURNING id, title, subtitle, image, is_active, created_at, updated_at`,
//       [title || null, subtitle || null, image || null, isActive ?? null, id]
//     );

//     if (result.rows.length === 0) {
//       const error = new Error("Banner not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     return result.rows[0];
//   } catch (error) {
//     throw error;
//   }
// }

// async function deleteById(id) {
//   try {
//     const result = await query(
//       "DELETE FROM banners WHERE id = $1 RETURNING id, image",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       const error = new Error("Banner not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     return result.rows[0];
//   } catch (error) {
//     throw error;
//   }
// }

// export default {
//   getCurrent,
//   getAll,
//   create,
//   update,
//   delete: deleteById,
// };

import { query } from "../config/db.js";

async function getCurrent() {
  const result = await query(
    `SELECT *
     FROM banners
     WHERE is_active = true
     ORDER BY updated_at DESC
     LIMIT 5`
  );

  return result.rows || [];
}

async function getAll() {
  const result = await query(
    `SELECT *
     FROM banners
     ORDER BY created_at DESC`
  );

  return result.rows;
}

async function getById(id) {
  const result = await query(
    `SELECT * FROM banners WHERE id = $1 LIMIT 1`,
    [id]
  );

  return result.rows[0] || null;
}

async function create(data) {
  const result = await query(
    `INSERT INTO banners
    (title, subtitle, image, is_active)
    VALUES ($1,$2,$3,$4)
    RETURNING *`,
    [
      data.title,
      data.subtitle,
      data.image,
      data.isActive,
    ]
  );

  // ensure we only keep the latest 5 active banners
  await ensureActiveLimit(5);

  return result.rows[0];
}

async function update(id, data) {
  const result = await query(
    `UPDATE banners
     SET
       title = COALESCE($1,title),
       subtitle = COALESCE($2,subtitle),
       image = COALESCE($3,image),
       is_active = COALESCE($4,is_active),
       updated_at = NOW()
     WHERE id=$5
     RETURNING *`,
    [
      data.title,
      data.subtitle,
      data.image,
      data.isActive,
      id,
    ]
  );

  // if banner was activated, ensure active limit
  if (data.isActive) {
    await ensureActiveLimit(5);
  }

  return result.rows[0];
}

async function deleteBanner(id) {
  const result = await query(
    `DELETE FROM banners
     WHERE id=$1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
}

async function ensureActiveLimit(limit = 5) {
  // Deactivate older active banners beyond the newest `limit`
  await query(
    `UPDATE banners
     SET is_active = false
     WHERE id NOT IN (
       SELECT id FROM banners WHERE is_active = true ORDER BY updated_at DESC LIMIT $1
     ) AND is_active = true`,
    [limit]
  );
}

export default {
  getCurrent,
  getAll,
  getById,
  create,
  update,
  delete: deleteBanner,
  ensureActiveLimit,
};