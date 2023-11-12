import { Router } from "express";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import productRouter from "./product.router.js";
import chatRouter from "./chatRoom.router.js";
import messageRouter from "./message.router.js";
const router = Router();
// User router
router.use("/user", userRouter);
// Auth
router.use("/auth", authRouter);
// Product
router.use("/product", productRouter);
// Chat
router.use("/chat", chatRouter);
// Message
router.use("/message", messageRouter);

export default router;
