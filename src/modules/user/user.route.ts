import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { userController } from "./user.controller";
import { get } from "node:http";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();

router.post("/", userController.createUser);
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.agent),
  userController.getAllUsers,
);

router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
export const userRoute = router;
