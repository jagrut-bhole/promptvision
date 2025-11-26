import { Image } from "../models/image.models.js";
import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const randomSeed = () => {
  return Math.floor(Math.random() * 1000000);
};

const generateImage = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    throw new apiError("Please Provide the Prompt!!");
  }

  const model = 'flux';

  const seed = randomSeed();

  const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?seed=${seed}&width=1024&height=1024&model=${model}&nologo=true`;

  console.log("Image URL: ",imageUrl);

  return res
    .status(200)
    .json(new apiResponse(200, "Image Generated Successfully!!", { imageUrl }));
});

const shareImage = asyncHandler(async (req, res) => {
  const { imageUrl, prompt, style } = req.body;
  const userId = req.user._id;

  if (!imageUrl || !prompt || !style) {
    throw new apiError("Image URL, prompt, and style are required!");
  }

  // Create image document
  const image = await Image.create({
    imageUrl,
    prompt,
    style,
    createdBy: userId,
  });

  // Update user's sharedImages array
  await User.findByIdAndUpdate(
    userId,
    { $push: { sharedImages: image._id } },
    { new: true }
  );

  return res
    .status(201)
    .json(new apiResponse(201, "Image shared successfully!", { image }));
});

const getCommunityImages = asyncHandler(async (req, res) => {
  const images = await Image.find()
    .populate("createdBy", "fullName username")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, "Community images fetched successfully!", { images }));
});

const getUserImages = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const images = await Image.find({ createdBy: userId })
    .populate("createdBy", "fullName username")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new apiResponse(200, "User images fetched successfully!", { images }));
});

export { generateImage, shareImage, getCommunityImages, getUserImages };
