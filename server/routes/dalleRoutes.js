import express from "express";
import * as dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();

// Initialize Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.get("/", (req, res) => {
  res.send("Hello from Google Gemini!");
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Generate Image using Google Gemini
    const model = genAI.getGenerativeModel({ model: "imagen-3.0-generate-002" });
    const response = await model.generateContent(prompt);
    const imageData = response.response.candidates[0].content.parts[0].inlineData;

    if (!imageData) {
      return res.status(500).json({ error: "Failed to generate image" });
    }

    // Return base64 image
    res.status(200).json({ photo: imageData.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

export default router;
