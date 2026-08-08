import dotenv from "dotenv";

dotenv.config();

// const requiredEnvVars = [
//   "PORT",
//   "NODE_ENV",
//   "DATABASE_URL",
//   "JWT_SECRET",
//   "JWT_EXPIRES_IN",
//   "SUPABASE_URL",
//   "SUPABASE_SERVICE_ROLE_KEY",
//   "SUPABASE_BUCKET",
//   "FRONTEND_URL",
//   "ADMIN_URL",
// ];
const requiredEnvVars = [
  "PORT",
  "NODE_ENV",

  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",

  "JWT_SECRET",
  "JWT_EXPIRES_IN",

  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_BUCKET",

  "FRONTEND_URL",
  "ADMIN_URL",
];

function validateEnv() {
  const missingVars = requiredEnvVars.filter(
    (key) => !process.env[key] || process.env[key].trim() === ""
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
}

validateEnv();

const env = {
  nodeEnv: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",

  port: Number(process.env.PORT),

  // database: {
  //   url: process.env.DATABASE_URL,
  //   ssl: process.env.DATABASE_SSL === "true",
  // },
database: {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  ssl: process.env.DATABASE_SSL === "true",
},

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    bucket: process.env.SUPABASE_BUCKET,
  },

  cors: {
    frontendUrl: process.env.FRONTEND_URL,
    adminUrl: process.env.ADMIN_URL,
  },

  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  },
};

export default env;