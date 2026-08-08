import env from "./env.js";

const allowedOrigins = [env.cors.frontendUrl, env.cors.adminUrl].filter(
  Boolean
);

const corsConfig = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} is not allowed by CORS policy`));
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