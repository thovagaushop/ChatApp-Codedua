import { Router } from "express";
import upload from "../config/multer.config.js";
import * as userController from "../controllers/user.controller.js";
import jwtauthenticateMiddleware from "../middlewares/jwtauthenticate.middleware.js";
const router = Router();

router.get("/profile", jwtauthenticateMiddleware, userController.profile);
router.put("/profile", upload.single("file"), userController.updateProfile);
router.get("/:id", userController.findById);

export default router;
