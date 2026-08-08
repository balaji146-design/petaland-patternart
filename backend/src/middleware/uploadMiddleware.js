import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempUploadDir = path.join(__dirname, "../uploads/temp");

if (!fs.existsSync(tempUploadDir)) {
  fs.mkdirSync(tempUploadDir, { recursive: true });
}

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  const isMimeAllowed = allowedMimeTypes.includes(file.mimetype);
  const isExtAllowed = [".jpg", ".jpeg", ".png", ".webp"].includes(
    path.extname(file.originalname).toLowerCase()
  );

  if (isMimeAllowed && isExtAllowed) {
    return cb(null, true);
  }

  const error = new Error(
    "Only image files are allowed (jpg, jpeg, png, webp)"
  );
  error.statusCode = 400;
  return cb(error, false);
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 5,
  },
});

function handleUploadErrors(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size must not exceed 10MB",
      });
    }

    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "Too many files uploaded",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message || "File upload failed",
    });
  }

  return next();
}

export const uploadSingleImage = (fieldName) => [
  upload.single(fieldName),
  handleUploadErrors,
];

export const uploadMultipleImages = (fieldName, maxCount = 5) => [
  upload.array(fieldName, maxCount),
  handleUploadErrors,
];

export default upload;