import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import authenticateMiddleware from "../middlewares/authenticate.middleware.js";
import {
  googleCallbackMiddleware,
  googleauthenticateMiddleware,
} from "../middlewares/googleauthenticate.middleware.js";
import StatusResponseConstant from "../common/constant/statusResponse.constant.js";
import MessageConstant from "../common/constant/message.constant.js";
import {
  facebookAuthenticateMiddleware,
  facebookCallbackMiddleware,
} from "../middlewares/facebookAuthenticate.middleware.js";

const router = Router();

router.post("/login", authenticateMiddleware, authController.login);
router.post("/register", authController.register);
// Check authenticated
router.get("/authenticated/success", authController.login);
router.get("/authenticated/failed", authController.nonAuthenticated);
// Auth google
router.get("/google", googleauthenticateMiddleware);
router.get("/google/callback", googleCallbackMiddleware);
// Auth facebook
router.get("/facebook", facebookAuthenticateMiddleware);
router.get("/facebook/callback", facebookCallbackMiddleware);
// Logout
router.get("/logout", authController.logout);
export default router;
