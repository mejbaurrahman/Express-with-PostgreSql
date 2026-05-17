import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.get("/", (req: Request, res: Response) => {
  //   res.send("Express server is running!");
  res
    .status(200)
    .json({ message: "Express server is running!", author: "Next Level" });
});

app.use("/api/users", userRoute);
app.use("/api/profiles", profileRoute);

export default app;
