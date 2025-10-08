import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
import { imageRouter } from "./routes/image.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.json({ limit: "20kb" }));

app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/images", imageRouter);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!", status: "OK" });
});

export { app };
