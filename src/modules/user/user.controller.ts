import type { Request, Response } from "express";

import { userService } from "./user.service";
import { get } from "node:http";

const createUser = async (req: Request, res: Response) => {
  const { name, email, password, age, role } = req.body;

  try {
    const result = await userService.createUserIntoDB(req.body);
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
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();
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
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.getUserByIdFromDB(id as string);
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
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const result = await userService.updateUserInDB(id as string, updateData);
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
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserFromDB(id as string);
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
};
export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
