import pg from "pg";
import env from "./env.js";

const { Pool } = pg;

// const pool = new Pool({
//   connectionString: env.database.url,
//   ssl: env.database.ssl ? { rejectUnauthorized: false } : false,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 5000,
// });
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on("connect", () => {
  console.log("PostgreSQL pool: new client connected");
});

pool.on("error", (error) => {
  console.error("Unexpected error on idle PostgreSQL client:", error.message);
  process.exit(1);
});

// export async function connectDB() {
//   try {
//     const client = await pool.connect();
//     await client.query("SELECT NOW()");
//     client.release();
//     console.log("PostgreSQL database connected successfully");
//   } catch (error) {
//     console.error("PostgreSQL connection failed:", error.message);
//     throw error;
//   }
// }

export async function connectDB() {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();

    console.log("PostgreSQL database connected successfully");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
    throw error;
  }
}

export async function query(text, params) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error("Database query error:", error.message);
    throw error;
  }
}

export async function closeDB() {
  try {
    await pool.end();
    console.log("PostgreSQL pool has been closed");
  } catch (error) {
    console.error("Error closing PostgreSQL pool:", error.message);
    throw error;
  }
}

export default pool;