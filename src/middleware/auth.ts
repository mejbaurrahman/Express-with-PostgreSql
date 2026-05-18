import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { config } from "../config";
import { pool } from "../db";
import type { ROLES } from "../types";

const auth = (...roles: ROLES[]) => {
  console.log("Roles: ", roles);
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //   console.log("This is Protected Route");
      //1. check if the token exists
      //2. verify the token
      //3. check if the user exists in the database
      //4. if the user active or not
      const token = req.headers.authorization;
      // console.log("Token: ", token);
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.jwt_secret_key as string,
      ) as JwtPayload;
      // console.log("Decoded: ", decoded);

      const userData = await pool.query(
        `
        SELECT * FROM users WHERE email = $1`,
        [decoded.email],
      );

      if (userData.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      if (userData.rows[0]?.is_active === false) {
        return res.status(403).json({
          success: false,
          message: "User is not active",
        });
      }
      if (roles.length > 0 && !roles.includes(userData.rows[0].role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden, role has no access",
        });
      }
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Authentication error: ", error);
      next(error);
    }
  };
};
export default auth;
