import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import jwtauthenticateMiddleware from "../middlewares/jwtauthenticate.middleware.js";
const router = Router();

router.post("/", userController.create);
router.get("/profile", jwtauthenticateMiddleware, userController.profile);
router.get("/:id", userController.findById);

export default router;
