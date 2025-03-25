import express, { json } from "express";
import * as dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

dotenv.config();

const router = express.Router();

const generateSeed = () => {
  const seed = Math.floor(Math.random() * 1000000);
  return seed
}

router.post("/images", async (req, res)=>{
  const prompt = req.body.prompt

  const randomSeed = generateSeed()
  // const imageUrl = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${randomSeed}&width=1024&height=1024&nologo=true`)

  const resImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${randomSeed}&width=1024&height=1024&nologo=true`

  res.json({
    resImageUrl
  })
  

})
export default router;
