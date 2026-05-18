import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB({
      email: req.body.email,
      password: req.body.password,
    });

    const { accessToken, refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: false, // in production, set this to true to ensure the cookie is only sent over HTTPS
      httpOnly: true,
      sameSite: "lax", // adjust this based on your needs (e.g., "lax" or "none")
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
    error: error;
  }
};

const refreshToken = async (req: Request, res: Response) => {};
export const authController = {
  loginUser,
  refreshToken,
};
