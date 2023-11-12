import { Router } from "express";
import * as messageController from "../controllers/message.controller.js";
import jwtauthenticateMiddleware from "../middlewares/jwtauthenticate.middleware.js";

const router = Router();

router.post("/", jwtauthenticateMiddleware, messageController.sendMessage);
router.get(
  "/:chatRoomId",
  jwtauthenticateMiddleware,
  messageController.listMessageByRoomId
);
export default router;
