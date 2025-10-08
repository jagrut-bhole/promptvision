import express from "express";
import { generateImage, shareImage, getCommunityImages, getUserImages } from "../controllers/image.controllers.js";
import { jwtVerify } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Public routes
router.get("/", getCommunityImages);

// Protected routes
router.post("/generate", jwtVerify, generateImage);
router.post("/share", jwtVerify, shareImage);
router.get("/user/:userId", jwtVerify, getUserImages);

export { router as imageRouter };
