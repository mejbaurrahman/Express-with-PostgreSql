import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  const { user_id, bio, address, phone, gender } = req.body;

  try {
    // Implementation for creating a profile
    const result = await profileService.createProfileIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Not created",
    });
  }
};

export const profileController = {
  createProfile,
};
