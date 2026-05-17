import { Pool } from "pg";
import { config } from "../config";

export const pool = new Pool({
  connectionString: config.db,
});

export const initDB = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
)
            `);
    console.log("Database connection initialized");
  } catch (error) {
    console.log("Error initializing database connection:", error);
  }
};
