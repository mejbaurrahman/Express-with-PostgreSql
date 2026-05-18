import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import fs from "fs";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(logger);

app.get("/", (req: Request, res: Response) => {
  //   res.send("Express server is running!");
  res
    .status(200)
    .json({ message: "Express server is running!", author: "Next Level" });
});

app.use("/api/users", userRoute);
app.use("/api/profiles", profileRoute);
app.use("/api/auth", authRoute);

export default app;
