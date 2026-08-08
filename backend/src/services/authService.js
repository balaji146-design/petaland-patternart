// import bcrypt from "bcryptjs";
// import { query } from "../config/db.js";
// import generateToken from "../utils/generateToken.js";

// export async function validateAdminCredentials(email, password) {
//   const result = await query(
//     "SELECT id, name, email, password, avatar_url, created_at FROM admins WHERE email = $1 LIMIT 1",
//     [email.toLowerCase().trim()]
//   );

//   const admin = result.rows[0];

//   if (!admin) {
//     const error = new Error("Invalid email or password");
//     error.statusCode = 401;
//     throw error;
//   }

//   const isPasswordValid = await bcrypt.compare(password, admin.password);

//   if (!isPasswordValid) {
//     const error = new Error("Invalid email or password");
//     error.statusCode = 401;
//     throw error;
//   }

//   const tokenPayload = {
//     id: admin.id,
//     email: admin.email,
//     role: "admin",
//   };

//   const token = generateToken(tokenPayload);

//   const adminProfile = {
//     id: admin.id,
//     name: admin.name,
//     email: admin.email,
//     avatarUrl: admin.avatar_url,
//     createdAt: admin.created_at,
//   };

//   return { token, admin: adminProfile };
// }

// export async function getAdminProfile(adminId) {
//   const result = await query(
//     "SELECT id, name, email, avatar_url, created_at FROM admins WHERE id = $1 LIMIT 1",
//     [adminId]
//   );

//   const admin = result.rows[0];

//   if (!admin) {
//     const error = new Error("Admin not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   return {
//     id: admin.id,
//     name: admin.name,
//     email: admin.email,
//     avatarUrl: admin.avatar_url,
//     createdAt: admin.created_at,
//   };
// }

// export default {
//   validateAdminCredentials,
//   getAdminProfile,
// };

import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

async function validateAdminCredentials(email, password) {
  const admin = await Admin.findByEmail(email);

  if (!admin) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const tokenPayload = {
    id: admin.id,
    email: admin.email,
    role: "admin",
  };

  const token = generateToken(tokenPayload);

  // const adminProfile = {
  //   id: admin.id,
  //   name: admin.name,
  //   email: admin.email,
  //   avatarUrl: admin.avatar_url,
  //   createdAt: admin.created_at,
  // };

  const adminProfile = {
  id: admin.id,
  fullName: admin.full_name,
  email: admin.email,
  profileImage: admin.profile_image,
  createdAt: admin.created_at,
};

  return { token, admin: adminProfile };
}

async function getAdminProfile(adminId) {
  const admin = await Admin.findById(adminId);

  if (!admin) {
    const error = new Error("Admin not found");
    error.statusCode = 404;
    throw error;
  }

  // return {
  //   id: admin.id,
  //   name: admin.name,
  //   email: admin.email,
  //   avatarUrl: admin.avatar_url,
  //   createdAt: admin.created_at,
  // };

  return {
  id: admin.id,
  fullName: admin.full_name,
  email: admin.email,
  profileImage: admin.profile_image,
  createdAt: admin.created_at,
};
}

async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plainPassword, salt);
}

export default {
  validateAdminCredentials,
  getAdminProfile,
  hashPassword,
};