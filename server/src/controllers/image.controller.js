import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";

const randomSeed = () => {
  const seed = Math.floor(Math.random() * 1000000);
  return seed;
};

const generateImage = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    throw new apiError(400, "Prompt is required");
  }

  const Seed = randomSeed();

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${Seed}&width=1024&height=1024&nologo=true`;

  // console.log("SuccessFully generated the Image: ", imageUrl);

  return res
    .status(200)
    .json(new apiResponse(200, { imageUrl }, "Image generated successfully"));
});

export { generateImage };
