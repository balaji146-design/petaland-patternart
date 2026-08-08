// import bcrypt from "bcryptjs";
// import { query } from "../config/db.js";
// import authService from "../services/authService.js";
// import Admin from "../models/Admin.js";
// import apiResponse from "../utils/apiResponse.js";

// export async function getDashboardStats(req, res, next) {
//   try {
//     const [designsResult, categoriesResult, messagesResult, bannersResult] =
//       await Promise.all([
//         query("SELECT COUNT(*)::int AS count FROM designs"),
//         query("SELECT COUNT(*)::int AS count FROM categories"),
//         query("SELECT COUNT(*)::int AS count FROM contacts"),
//         query("SELECT COUNT(*)::int AS count FROM banners"),
//       ]);

//     const stats = {
//       totalDesigns: designsResult.rows[0].count,
//       totalCategories: categoriesResult.rows[0].count,
//       totalMessages: messagesResult.rows[0].count,
//       totalBanners: bannersResult.rows[0].count,
//     };

//     return apiResponse.success(res, "Dashboard statistics fetched successfully", stats);
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function getAdminProfile(req, res, next) {
//   try {
//     const adminId = req.admin?.id;

//     if (!adminId) {
//       return apiResponse.unauthorized(res);
//     }

//     const admin = await authService.getAdminProfile(adminId);

//     return apiResponse.success(res, "Profile fetched successfully", admin);
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function updateAdminProfile(req, res, next) {
//   try {
//     const adminId = req.admin?.id;

//     if (!adminId) {
//       return apiResponse.unauthorized(res);
//     }

//     const { name, avatarUrl } = req.body;

//     if (!name && !avatarUrl) {
//       return apiResponse.badRequest(res, "At least one field is required to update");
//     }

//     const updatedAdmin = await Admin.updateProfile(adminId, { name, avatarUrl });

//     return apiResponse.success(res, "Profile updated successfully", updatedAdmin);
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function changePassword(req, res, next) {
//   try {
//     const adminId = req.admin?.id;

//     if (!adminId) {
//       return apiResponse.unauthorized(res);
//     }

//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return apiResponse.badRequest(res, "Current password and new password are required");
//     }

//     if (newPassword.length < 6) {
//       return apiResponse.badRequest(res, "New password must be at least 6 characters long");
//     }

//     const result = await query(
//       "SELECT id, password FROM admins WHERE id = $1 LIMIT 1",
//       [adminId]
//     );

//     const admin = result.rows[0];

//     if (!admin) {
//       return apiResponse.notFound(res, "Admin not found");
//     }

//     const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);

//     if (!isPasswordValid) {
//       return apiResponse.badRequest(res, "Current password is incorrect");
//     }

//     const hashedPassword = await authService.hashPassword(newPassword);

//     await query(
//       "UPDATE admins SET password = $1, updated_at = NOW() WHERE id = $2",
//       [hashedPassword, adminId]
//     );

//     return apiResponse.success(res, "Password changed successfully");
//   } catch (error) {
//     return next(error);
//   }
// }

// export default {
//   getDashboardStats,
//   getAdminProfile,
//   updateAdminProfile,
//   changePassword,
// };

import bcrypt from "bcryptjs";
import { query } from "../config/db.js";
import authService from "../services/authService.js";
import Admin from "../models/Admin.js";
import apiResponse from "../utils/apiResponse.js";

export async function getDashboardStats(req, res, next) {
  try {
    const [designsResult, categoriesResult, messagesResult, bannersResult] =
      await Promise.all([
        query("SELECT COUNT(*)::int AS count FROM designs"),
        query("SELECT COUNT(*)::int AS count FROM categories"),
        query("SELECT COUNT(*)::int AS count FROM contacts"),
        query("SELECT COUNT(*)::int AS count FROM banners"),
      ]);

    const stats = {
      totalDesigns: designsResult.rows[0].count,
      totalCategories: categoriesResult.rows[0].count,
      totalMessages: messagesResult.rows[0].count,
      totalBanners: bannersResult.rows[0].count,
    };

    return apiResponse.success(res, "Dashboard statistics fetched successfully", stats);
  } catch (error) {
    return next(error);
  }
}

export async function getAdminProfile(req, res, next) {
  try {
    const adminId = req.admin?.id;

    if (!adminId) {
      return apiResponse.unauthorized(res);
    }

    const admin = await authService.getAdminProfile(adminId);

    return apiResponse.success(res, "Profile fetched successfully", admin);
  } catch (error) {
    return next(error);
  }
}

export async function updateAdminProfile(req, res, next) {
  try {
    const adminId = req.admin?.id;

    if (!adminId) {
      return apiResponse.unauthorized(res);
    }

    const { fullName, profileImage } = req.body;

    if (!fullName && !profileImage) {
      return apiResponse.badRequest(res, "At least one field is required to update");
    }

    const updatedAdmin = await Admin.updateProfile(adminId, {
      full_name: fullName,
      profile_image: profileImage,
    });

    const formattedAdmin = {
      id: updatedAdmin.id,
      fullName: updatedAdmin.full_name,
      email: updatedAdmin.email,
      profileImage: updatedAdmin.profile_image,
      createdAt: updatedAdmin.created_at,
      updatedAt: updatedAdmin.updated_at,
    };

    return apiResponse.success(res, "Profile updated successfully", formattedAdmin);
  } catch (error) {
    return next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    const adminId = req.admin?.id;

    if (!adminId) {
      return apiResponse.unauthorized(res);
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return apiResponse.badRequest(res, "Current password and new password are required");
    }

    if (newPassword.length < 6) {
      return apiResponse.badRequest(res, "New password must be at least 6 characters long");
    }

    const result = await query(
      "SELECT id, password FROM admins WHERE id = $1 LIMIT 1",
      [adminId]
    );

    const admin = result.rows[0];

    if (!admin) {
      return apiResponse.notFound(res, "Admin not found");
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);

    if (!isPasswordValid) {
      return apiResponse.badRequest(res, "Current password is incorrect");
    }

    const hashedPassword = await authService.hashPassword(newPassword);

    await query(
      "UPDATE admins SET password = $1, updated_at = NOW() WHERE id = $2",
      [hashedPassword, adminId]
    );

    return apiResponse.success(res, "Password changed successfully");
  } catch (error) {
    return next(error);
  }
}

export default {
  getDashboardStats,
  getAdminProfile,
  updateAdminProfile,
  changePassword,
};