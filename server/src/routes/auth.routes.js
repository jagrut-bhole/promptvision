import express from "express";
import { register, login, logout } from "../controllers/user.controllers.js";
import { jwtVerify } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", jwtVerify, logout);

export { router as authRouter };
