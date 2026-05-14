import dotenv from "dotenv";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { Pool } from "pg";
const app: Application = express();
const PORT = 5000;
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

const pool = new Pool({
  connectionString: process.env.URI,
});

const initDB = async () => {
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
app.get("/", (req: Request, res: Response) => {
  //   res.send("Express server is running!");
  res
    .status(200)
    .json({ message: "Express server is running!", author: "Next Level" });
});

initDB();
app.post("/api/users", async (req: Request, res: Response) => {
  //   console.log(req.body);
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, age],
    );
    //   console.log(result);
    res.status(201).json({
      message: "User Created",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
      error: error,
    });
  }
});

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json({
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
      error: error,
    });
  }
});
app.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User retrieved successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
      error: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
