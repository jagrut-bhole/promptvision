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

const allowedOrigins = [
  'http://localhost:5173',
  'https://promptvision.jagrut.me',
  'https://promptvision.vercel.app',
  'https://promptvision.onrender.com'
];

app.use(cors({
  origin : function (origin,callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null,true)
    } else {
      callback(new Error('Not allowed by CORS!!'));
    }
  },
  credentials : true
}));

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
