// import { validateAdminCredentials, getAdminProfile } from "../services/authService.js";

// export async function login(req, res, next) {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a valid email address",
//       });
//     }

//     const { token, admin } = await validateAdminCredentials(email, password);

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       data: {
//         token,
//         admin,
//       },
//     });
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function logout(req, res, next) {
//   try {
//     return res.status(200).json({
//       success: true,
//       message: "Logout successful",
//     });
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function getProfile(req, res, next) {
//   try {
//     const adminId = req.admin?.id;

//     if (!adminId) {
//       return res.status(401).json({
//         success: false,
//         message: "Not authorized to access this resource",
//       });
//     }

//     const admin = await getAdminProfile(adminId);

//     return res.status(200).json({
//       success: true,
//       message: "Profile fetched successfully",
//       data: admin,
//     });
//   } catch (error) {
//     return next(error);
//   }
// }

// export default {
//   login,
//   logout,
//   getProfile,
// };


import authService from "../services/authService.js";

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const { token, admin } = await authService.validateAdminCredentials(
      email,
      password
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        admin,
      },
    });
  } catch (error) {
    return next(error);
  }
}

export async function logout(req, res, next) {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return next(error);
  }
}

export async function getProfile(req, res, next) {
  try {
    const adminId = req.admin?.id;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this resource",
      });
    }

    const admin = await authService.getAdminProfile(adminId);

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: admin,
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  login,
  logout,
  getProfile,
};