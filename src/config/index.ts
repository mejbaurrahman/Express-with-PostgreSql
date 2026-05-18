import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const config = {
  port: process.env.PORT || 5000,
  db: process.env.URI as string,
  jwt_secret_key: process.env.JWT_SECRET_KEY as string,
  jwt_secret_refresh_key: process.env.JWT_SECRET_REFRESH_KEY as string,
};
