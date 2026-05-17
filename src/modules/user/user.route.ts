import { Router, type Request, type Response } from "express";

import { userController } from "./user.controller";
import { get } from "node:http";

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
export const userRoute = router;
