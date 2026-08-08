// import designService from "../services/designService.js";

// export async function getAllDesigns(req, res, next) {
//   try {
//     const { category, search } = req.query;

//     const designs = await designService.getAllDesigns({ category, search });

//     return res.status(200).json({
//       success: true,
//       message: "Designs fetched successfully",
//       data: designs,
//     });
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function getDesignById(req, res, next) {
//   try {
//     const { id } = req.params;

//     const design = await designService.getDesignById(id);

//     return res.status(200).json({
//       success: true,
//       message: "Design fetched successfully",
//       data: design,
//     });
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function getFeaturedDesigns(req, res, next) {
//   try {
//     const designs = await designService.getFeaturedDesigns();

//     return res.status(200).json({
//       success: true,
//       message: "Featured designs fetched successfully",
//       data: designs,
//     });
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function createDesign(req, res, next) {
//   try {
//     const design = await designService.createDesign(req.body, req.file);

//     return res.status(201).json({
//       success: true,
//       message: "Design created successfully",
//       data: design,
//     });
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function updateDesign(req, res, next) {
//   try {
//     const { id } = req.params;

//     const design = await designService.updateDesign(id, req.body, req.file);

//     return res.status(200).json({
//       success: true,
//       message: "Design updated successfully",
//       data: design,
//     });
//   } catch (error) {
//     return next(error);
//   }
// }

// export async function deleteDesign(req, res, next) {
//   try {
//     const { id } = req.params;

//     await designService.deleteDesign(id);

//     return res.status(200).json({
//       success: true,
//       message: "Design deleted successfully",
//     });
//   } catch (error) {
//     return next(error);
//   }
// }

// export default {
//   getAllDesigns,
//   getDesignById,
//   getFeaturedDesigns,
//   createDesign,
//   updateDesign,
//   deleteDesign,
// };

import designService from "../services/designService.js";

export async function getAllDesigns(req, res, next) {
  try {
    const { categoryId, search } = req.query;

    const designs = await designService.getAllDesigns({ categoryId, search });

    return res.status(200).json({
      success: true,
      message: "Designs fetched successfully",
      data: designs,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getDesignById(req, res, next) {
  try {
    const { id } = req.params;

    const design = await designService.getDesignById(id);

    return res.status(200).json({
      success: true,
      message: "Design fetched successfully",
      data: design,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getFeaturedDesigns(req, res, next) {
  try {
    const designs = await designService.getFeaturedDesigns();

    return res.status(200).json({
      success: true,
      message: "Featured designs fetched successfully",
      data: designs,
    });
  } catch (error) {
    return next(error);
  }
}

export async function createDesign(req, res, next) {
  try {
    const design = await designService.createDesign(req.body, req.file);

    return res.status(201).json({
      success: true,
      message: "Design created successfully",
      data: design,
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateDesign(req, res, next) {
  try {
    const { id } = req.params;

    const design = await designService.updateDesign(id, req.body, req.file);

    return res.status(200).json({
      success: true,
      message: "Design updated successfully",
      data: design,
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteDesign(req, res, next) {
  try {
    const { id } = req.params;

    await designService.deleteDesign(id);

    return res.status(200).json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  getAllDesigns,
  getDesignById,
  getFeaturedDesigns,
  createDesign,
  updateDesign,
  deleteDesign,
};