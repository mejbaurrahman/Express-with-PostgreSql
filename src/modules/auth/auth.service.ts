import bcrypt from "bcrypt";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import { config } from "../../config";
const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  // Simulate database login logic
  const { email, password } = payload;
  //1. check if user exixts
  //2. compare password
  //3. generate token
  //4. return token and user info
  const userData = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (userData.rowCount === 0) {
    throw new Error("User not found");
  }
  const user = userData.rows[0];

  const matchPassowrd = await bcrypt.compare(password, user.password);
  if (!matchPassowrd) {
    throw new Error("Invalid password");
  }
  // Generate a simple token (in a real application, you would use a more secure method)
  //
  const jwtPayload = {
    userId: user.id,
    email: user.email,
    is_active: user.is_active,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_secret_key || "your_secret_key",
    {
      expiresIn: "1d",
    },
  );
  return { accessToken };
};

export const authService = {
  loginUserIntoDB,
};
