import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import isAuthenticateMiddleware from "../middlewares/isAuthenticate.middleware.js";

const router = Router();

router.get("/", isAuthenticateMiddleware, productController.find);

export default router;
