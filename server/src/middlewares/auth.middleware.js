import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  // tokens gheyche
  // check karayche
  // decode karayche tokens
  // user la find karaycha
  // user la check karaycha
  // requset made user la send karaycha

  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("Token received:", token);

    if (!token) {
      throw new apiError(401, "UnAuthorized Request...");
    }

    console.log("Secret key:", process.env.ACCESS_TOKEN_SECRET);

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log("Decoded Token:", decodedToken);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new apiError(400, "Invalid Request...");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    throw new apiError(400, "Invalid Access Token");
  }
});
