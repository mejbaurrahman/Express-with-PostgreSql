import type { NextFunction, Request, Response } from "express";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //   console.log("This is Protected Route");

    const token = req.headers.authorization;
    // console.log("Token: ", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    next();
  };
};

export default auth;
