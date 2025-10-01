import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import imageRouter from "./routes/image.route.js";


const app = express();

app.use(express.json({ limit: "20kb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// defining routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/images", imageRouter);

export { app };
