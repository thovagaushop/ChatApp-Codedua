import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import authenticateMiddleware from "../middlewares/authenticate.middleware.js";
import { googleauthenticateMiddleware } from "../middlewares/googleauthenticate.middleware.js";
import StatusResponseConstant from "../common/constant/statusResponse.constant.js";
import MessageConstant from "../common/constant/message.constant.js";
import { facebookAuthenticateMiddleware } from "../middlewares/facebookAuthenticate.middleware.js";

const router = Router();

// Login
router.post("/login", authController.register);

// Login by google
router.post(
  "/google",
  googleauthenticateMiddleware,
  authController.googleLogin
);

// Login by facebook
router.post(
  "/facebook",
  facebookAuthenticateMiddleware,
  authController.faceBookLogin
);

// Register and verify email by otp
// router.post("/register", authController.register);
router.post("/verify", authController.verifyEmail);

// Check authenticated
router.get("/authenticated/success", authController.login);
router.get("/authenticated/failed", authController.nonAuthenticated);

// Logout
router.get("/logout", authController.logout);
export default router;
