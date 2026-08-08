// import bannerService from "../services/bannerService.js";

// export async function getBanner(req, res, next) {
//   try {
//     // const banner = await bannerService.getCurrentBanner();

//     // return res.status(200).json({
//     //   success: true,
//     //   message: "Banner fetched successfully",
//     //   data: banner,
//     // });

//     const banners = await bannerService.getAllBanners();

// return res.json({
//   success: true,
//   data: banners,
// });
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function uploadBanner(req, res, next) {
//   try {
//     const banner = await bannerService.uploadBanner(req.body, req.file);

//     return res.status(201).json({
//       success: true,
//       message: "Banner uploaded successfully",
//       data: banner,
//     });
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function updateBanner(req, res, next) {
//   try {
//     const { id } = req.params;

//     const banner = await bannerService.updateBanner(id, req.body, req.file);

//     return res.status(200).json({
//       success: true,
//       message: "Banner updated successfully",
//       data: banner,
//     });
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function deleteBanner(req, res, next) {
//   try {
//     const { id } = req.params;

//     await bannerService.deleteBanner(id);

//     return res.status(200).json({
//       success: true,
//       message: "Banner deleted successfully",
//     });
//   } catch (error) {
//     return next(error);
//   }
// }

// export default {
//   getBanner,
//   uploadBanner,
//   updateBanner,
//   deleteBanner,
// };

import bannerService from "../services/bannerService.js";

// =========================
// GET ALL BANNERS (ADMIN)
// =========================
export async function getAllBanners(req, res, next) {
  try {
    const banners = await bannerService.getAllBanners();

    return res.status(200).json({
      success: true,
      message: "Banners fetched successfully",
      data: banners,
    });
  } catch (error) {
    return next(error);
  }
}

// =========================
// GET CURRENT BANNER (FRONTEND)
// =========================
export async function getCurrentBanner(req, res, next) {
  try {
    const banner = await bannerService.getCurrentBanner();

    return res.status(200).json({
      success: true,
      message: "Current banner fetched successfully",
      data: banner,
    });
  } catch (error) {
    return next(error);
  }
}

// =========================
// UPLOAD
// =========================
export async function uploadBanner(req, res, next) {
  try {
    const banner = await bannerService.uploadBanner(req.body, req.file);

    return res.status(201).json({
      success: true,
      message: "Banner uploaded successfully",
      data: banner,
    });
  } catch (error) {
    return next(error);
  }
}

// =========================
// UPDATE
// =========================
export async function updateBanner(req, res, next) {
  try {
    const { id } = req.params;

    const banner = await bannerService.updateBanner(
      id,
      req.body,
      req.file
    );

    return res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    return next(error);
  }
}

// =========================
// DELETE
// =========================
export async function deleteBanner(req, res, next) {
  try {
    const { id } = req.params;

    await bannerService.deleteBanner(id);

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  getAllBanners,
  getCurrentBanner,
  uploadBanner,
  updateBanner,
  deleteBanner,
};