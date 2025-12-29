import { Image } from "../models/image.models.js";
import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const randomSeed = () => {
  return Math.floor(Math.random() * 1000000);
};

const generateImage = asyncHandler(async (req, res) => {
  const { prompt, style } = req.body;

  if (!prompt) {
    throw new apiError(400, "Please Provide the Prompt!!");
  }

  const seed = randomSeed();
  const enhancedPrompt = style ? `${prompt}, ${style} style` : prompt;

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?model=turbo&width=1024&height=1024&seed=${seed}&nologo=true&enhance=true`;

  return res
    .status(200)
    .json(
      new apiResponse(200, "Image Generated Successfully!!", { imageUrl })
    );
});

const shareImage = asyncHandler(async (req, res) => {
  const { imageUrl, prompt, style } = req.body;
  const userId = req.user._id;

  if (!imageUrl || !prompt || !style) {
    throw new apiError("Image URL, prompt, and style are required!");
  }

  const image = await Image.create({
    imageUrl,
    prompt,
    style,
    createdBy: userId,
  });

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
    .json(
      new apiResponse(200, "Community images fetched successfully!", { images })
    );
});

const getUserImages = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const images = await Image.find({ createdBy: userId })
    .populate("createdBy", "fullName username")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new apiResponse(200, "User images fetched successfully!", { images })
    );
});

export { generateImage, shareImage, getCommunityImages, getUserImages };
