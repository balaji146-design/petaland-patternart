// import { query } from "../config/db.js";

// async function getAll(filters = {}) {
//   try {
//     const { category, search } = filters;

//     const conditions = [];
//     const params = [];
//     let paramIndex = 1;

//     if (category && category !== "All") {
//       conditions.push(`category = $${paramIndex}`);
//       params.push(category);
//       paramIndex += 1;
//     }

//     if (search) {
//       conditions.push(`name ILIKE $${paramIndex}`);
//       params.push(`%${search}%`);
//       paramIndex += 1;
//     }

//     const whereClause =
//       conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

//     const result = await query(
//       `SELECT id, name, category, description, image_url, actual_price, offer_price, is_featured, created_at, updated_at
//        FROM designs
//        ${whereClause}
//        ORDER BY created_at DESC`,
//       params
//     );

//     return result.rows;
//   } catch (error) {
//     throw new Error(`Failed to fetch designs: ${error.message}`);
//   }
// }

// async function getById(id) {
//   try {
//     const result = await query(
//       `SELECT id, name, category, description, image_url, actual_price, offer_price, is_featured, created_at, updated_at
//        FROM designs WHERE id = $1 LIMIT 1`,
//       [id]
//     );

//     return result.rows[0] || null;
//   } catch (error) {
//     throw new Error(`Failed to fetch design: ${error.message}`);
//   }
// }

// async function getFeatured() {
//   try {
//     const result = await query(
//       `SELECT id, name, category, description, image_url, actual_price, offer_price, is_featured, created_at, updated_at
//        FROM designs WHERE is_featured = true ORDER BY created_at DESC`
//     );

//     return result.rows;
//   } catch (error) {
//     throw new Error(`Failed to fetch featured designs: ${error.message}`);
//   }
// }

// async function create(data) {
//   try {
//     const {
//       name,
//       category,
//       description,
//       imageUrl,
//       actualPrice,
//       offerPrice,
//       isFeatured = false,
//     } = data;

//     const result = await query(
//       `INSERT INTO designs (name, category, description, image_url, actual_price, offer_price, is_featured, created_at, updated_at)
//        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
//        RETURNING id, name, category, description, image_url, actual_price, offer_price, is_featured, created_at, updated_at`,
//       [name, category, description, imageUrl, actualPrice, offerPrice, isFeatured]
//     );

//     return result.rows[0];
//   } catch (error) {
//     throw new Error(`Failed to create design: ${error.message}`);
//   }
// }

// async function update(id, data) {
//   try {
//     const {
//       name,
//       category,
//       description,
//       imageUrl,
//       actualPrice,
//       offerPrice,
//       isFeatured,
//     } = data;

//     const result = await query(
//       `UPDATE designs
//        SET name = COALESCE($1, name),
//            category = COALESCE($2, category),
//            description = COALESCE($3, description),
//            image_url = COALESCE($4, image_url),
//            actual_price = COALESCE($5, actual_price),
//            offer_price = COALESCE($6, offer_price),
//            is_featured = COALESCE($7, is_featured),
//            updated_at = NOW()
//        WHERE id = $8
//        RETURNING id, name, category, description, image_url, actual_price, offer_price, is_featured, created_at, updated_at`,
//       [
//         name || null,
//         category || null,
//         description || null,
//         imageUrl || null,
//         actualPrice ?? null,
//         offerPrice ?? null,
//         isFeatured ?? null,
//         id,
//       ]
//     );

//     if (result.rows.length === 0) {
//       const error = new Error("Design not found");
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
//       "DELETE FROM designs WHERE id = $1 RETURNING id, image_url",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       const error = new Error("Design not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     return result.rows[0];
//   } catch (error) {
//     throw error;
//   }
// }

// export default {
//   getAll,
//   getById,
//   getFeatured,
//   create,
//   update,
//   delete: deleteById,
// };


import { query } from "../config/db.js";

async function getAll(filters = {}) {
  try {
    const { categoryId, search } = filters;

    const conditions = [];
    const params = [];
    let paramIndex = 1;

    if (categoryId) {
      conditions.push(`d.category_id = $${paramIndex}`);
      params.push(categoryId);
      paramIndex += 1;
    }

    if (search) {
      conditions.push(`d.name ILIKE $${paramIndex}`);
      params.push(`%${search}%`);
      paramIndex += 1;
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const result = await query(
      `SELECT d.id, d.category_id, c.name AS category_name, d.name, d.description,
              d.image AS image_url, d.images, d.actual_price, d.offer_price, d.featured, d.created_at, d.updated_at
       FROM designs d
       LEFT JOIN categories c ON c.id = d.category_id
       ${whereClause}
       ORDER BY d.created_at DESC`,
      params
    );

    return result.rows;
  } catch (error) {
    throw new Error(`Failed to fetch designs: ${error.message}`);
  }
}

async function getById(id) {
  try {
    const result = await query(
      `SELECT d.id, d.category_id, c.name AS category_name, d.name, d.description,
              d.image, d.images, d.actual_price, d.offer_price, d.featured, d.created_at, d.updated_at
       FROM designs d
       LEFT JOIN categories c ON c.id = d.category_id
       WHERE d.id = $1 LIMIT 1`,
      [id]
    );

    return result.rows[0] || null;
  } catch (error) {
    throw new Error(`Failed to fetch design: ${error.message}`);
  }
}

async function getFeatured() {
  try {
    const result = await query(
      `SELECT d.id, d.category_id, c.name AS category_name, d.name, d.description,
              d.image AS image_url, d.images, d.actual_price, d.offer_price, d.featured, d.created_at, d.updated_at
       FROM designs d
       LEFT JOIN categories c ON c.id = d.category_id
       WHERE d.featured = true
       ORDER BY d.created_at DESC`
    );

    return result.rows;
  } catch (error) {
    throw new Error(`Failed to fetch featured designs: ${error.message}`);
  }
}

async function create(data) {
  try {
    const {
      categoryId,
      name,
      description,
      image,
      images = [image],
      actualPrice,
      offerPrice,
      featured = false,
    } = data;

    const result = await query(
      `INSERT INTO designs (category_id, name, description, image, images, actual_price, offer_price, featured, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8, NOW(), NOW())
       RETURNING id, category_id, name, description, image AS image_url, images, actual_price, offer_price, featured, created_at, updated_at`,
      [categoryId, name, description, image, JSON.stringify(images), actualPrice, offerPrice, featured]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to create design: ${error.message}`);
  }
}

async function update(id, data) {
  try {
    const {
      categoryId,
      name,
      description,
      image,
      images,
      actualPrice,
      offerPrice,
      featured,
    } = data;

    const result = await query(
      `UPDATE designs
       SET category_id = COALESCE($1, category_id),
           name = COALESCE($2, name),
           description = COALESCE($3, description),
           image = COALESCE($4, image),
           images = COALESCE($5::jsonb, images),
           actual_price = COALESCE($6, actual_price),
           offer_price = COALESCE($7, offer_price),
           featured = COALESCE($8, featured),
           updated_at = NOW()
       WHERE id = $9
       RETURNING id, category_id, name, description, image AS image_url, images, actual_price, offer_price, featured, created_at, updated_at`,
      [
        categoryId || null,
        name || null,
        description || null,
        image || null,
        images ? JSON.stringify(images) : null,
        actualPrice ?? null,
        offerPrice ?? null,
        featured ?? null,
        id,
      ]
    );

    if (result.rows.length === 0) {
      const error = new Error("Design not found");
      error.statusCode = 404;
      throw error;
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

async function deleteById(id) {
  try {
    const result = await query(
      "DELETE FROM designs WHERE id = $1 RETURNING id, image",
      [id]
    );

    if (result.rows.length === 0) {
      const error = new Error("Design not found");
      error.statusCode = 404;
      throw error;
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export default {
  getAll,
  getById,
  getFeatured,
  create,
  update,
  delete: deleteById,
};