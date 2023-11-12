import { Router } from "express";
import * as chatRoomController from "../controllers/chatRoom.controller.js";

const router = Router();

router.get("/", chatRoomController.list);
router.post("/", chatRoomController.create);
router.get("/:id", chatRoomController.findById);
router.get("/user/:userId", chatRoomController.findByUserId);

export default router;
