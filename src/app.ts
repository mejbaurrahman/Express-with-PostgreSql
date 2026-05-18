import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import CokieParser from "cookie-parser";
import fs from "fs";
import cors from "cors";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import { error } from "console";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app: Application = express();

app.use(CokieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(logger);
const corsOptions = {
  origin: "http://localhost:5000", // Adjust this to your frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  //   res.send("Express server is running!");
  res
    .status(200)
    .json({ message: "Express server is running!", author: "Next Level" });
});

app.use("/api/users", userRoute);
app.use("/api/profiles", profileRoute);
app.use("/api/auth", authRoute);

// app.use((error: Error, req: Request, res: Response, next: Function) => {
//   console.error(error);
//   res.status(500).json({ message: "Internal Server Error" });
// });
app.use(globalErrorHandler());
export default app;
