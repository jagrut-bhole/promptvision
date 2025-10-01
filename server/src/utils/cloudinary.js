import { apiError } from "../utils/apiError.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    if (!response) {
      throw new apiError(400, "File path Missing...");
    }
    try {
      fs.unlinkSync(localFilePath);
      console.log("File path removed...");
    } catch (error) {
      console.log("Error in removing file path...", error);
    }

    return response;
  } catch (error) {
    try {
      fs.unlinkSync(localFilePath);
    } catch (error) {
      console.error("Failed to upload to Cloudinary..", error);
    }
    return null;
  }
};

export { uploadOnCloudinary };
