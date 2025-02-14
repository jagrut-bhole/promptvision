import express from "express";
import * as dotenv from "dotenv";

import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

//GETTING ALL THE POSTS
router.route("/").get(async (req, res) => {
  try {
    const post = await Post.find({});

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//CREATE A POST ROUTE
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body

    const newPost = await Post.create({
      name,
      prompt,
      photo: photo,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
