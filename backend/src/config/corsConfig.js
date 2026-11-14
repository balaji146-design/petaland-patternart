import env from "./env.js";

const normalizeOrigin = (origin) => origin?.trim().replace(/\/+$/, "");

const configuredOrigins = [
  env.cors.frontendUrl,
  env.cors.adminUrl,
  ...(process.env.CORS_ORIGINS || "").split(","),
]
  .map(normalizeOrigin)
  .filter(Boolean);

const isLocalDevelopmentOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);

const corsConfig = {
  origin: (origin, callback) => {
    const normalizedOrigin = normalizeOrigin(origin);
    if (
      !normalizedOrigin ||
      configuredOrigins.includes(normalizedOrigin) ||
      isLocalDevelopmentOrigin(normalizedOrigin)
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(`Origin ${origin} is not allowed by CORS policy`)
      );
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  exposedHeaders: ["Content-Length"],
  credentials: true,
  optionsSuccessStatus: 204,
  maxAge: 86400,
};

export default corsConfig;