import dotenv from "dotenv";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { Pool } from "pg";
import { config } from "./config";
import { pool } from "./db";
const app: Application = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.get("/", (req: Request, res: Response) => {
  //   res.send("Express server is running!");
  res
    .status(200)
    .json({ message: "Express server is running!", author: "Next Level" });
});

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

app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        age = COALESCE($4, age),
        is_active = COALESCE($5, is_active),
        updated_at = NOW()
      WHERE id = $6 RETURNING *`,
      [
        updateData.name,
        updateData.email,
        updateData.password,
        updateData.age,
        updateData.is_active,
        id,
      ],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unkonwn error",
      error: error,
    });
  }
});
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
      error: error,
    });
  }
});

export default app;
