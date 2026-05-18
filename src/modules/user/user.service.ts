import { get } from "node:http";
import { pool } from "../../db";
import type { IUSer } from "./user.interface";
import bcrypt from "bcrypt";
const createUserIntoDB = async (payload: IUSer) => {
  const { name, email, password, age, role } = payload;

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (name, email, password, age, role) VALUES ($1, $2, $3, $4, COALESCE($5, 'user')) RETURNING *",
    [name, email, hashPassword, age, role],
  );
  delete result.rows[0].password;
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result;
};

const getUserByIdFromDB = async (id: string) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result;
};

const updateUserInDB = async (id: string, payload: Partial<IUSer>) => {
  const result = await pool.query(
    `UPDATE users SET name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        age = COALESCE($4, age),
        is_active = COALESCE($5, is_active),
        updated_at = NOW()
      WHERE id = $6 RETURNING *`,
    [
      payload.name,
      payload.email,
      payload.password,
      payload.age,
      payload.is_active,
      id,
    ],
  );
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id],
  );
  return result;
};
export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
