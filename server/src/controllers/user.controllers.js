import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = user.generateAccessToken();

  const refreshToken = user.generateRefreshToken();

  await user.save({
    validateBeforeSave: false,
  });

  return { accessToken, refreshToken };
};

const options = {
  httpOnly: true,
  secure: true,
};

const register = asyncHandler(async (req, res) => {
  //take inputs
  //check the inputs
  //check is user exists
  //if not then create the user
  //generate access and refresh token
  //remove pvt things and sent other details to the user
  //set cookie
  const { fullName, username, email, password } = req.body;

  // console.log("Username:", username,"FullName:", fullName,":Email:", email, "Password:", password, ": @", new Date().toISOString());

  if (
    [username, email, password, fullName].some(
      (field) => !field || field?.trim() === " "
    )
  ) {
    throw new apiError(400, "Please enter all the fields");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new apiError("409", "User with email or username already exists, Kindly login with it...");
  }

  const user = await User.create({
    email,
    username: username.toLowerCase(),
    password,
    fullName,
  });

  // console.log("User: ",user);

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // console.log("AccessToken: ",accessToken ," : RefreshToken: ", refreshToken)

  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Server error while creating the user");
  }

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(201, "User created Successfully...", {
      user: createdUser,
      accessToken
    }));
});

const login = asyncHandler(async (req, res) => {
  //get the details
  //check if not empty
  // check if user exits
  // check the password
  // accesstoken and refreshtoken
  //return res

  const { email, password } = req.body;

  // console.log(":Email:", email, "Password:", password, ": @", new Date().toISOString());

  if (!email || !password) {
    throw new apiError(400, "User Not found");
  }

  const userCheck = await User.findOne({ email: email.toLowerCase() });

  if (!userCheck) {
    throw new apiError("400", "User does not exists");
  }

  const passwordCheck = await userCheck.isPasswordCorrect(password);

  if (!passwordCheck) {
    throw new apiError(400, "Password is invalid");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    userCheck._id
  );

  // console.log(":AccessToken:", accessToken, "RefreshToken:", refreshToken, ": @", new Date().toISOString());

  const loggedInUser = await User.findById(userCheck._id).select(
    "-password -refreshToken"
  );

    // console.log("Logged In User:", loggedInUser,": @", new Date().toISOString());

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(200, "User LoggedIn Successfully..", {
        user: loggedInUser,
        accessToken
      })
    );
});

const logout = asyncHandler(async (req, res) => {
  //get user details from the cookie
  // check if valid
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
        $unset: {
            refreshToken: 1
        }
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(201, "User Loggedout successfully..", {}));
});

const refreshToken = asyncHandler(async (req, res) => {
  // take the incoming tokens from request
  // decode it
  // decode karu find karayche
  // if not equal then error
  // access and refresh token generate karunn send akrayche

  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new apiError(400, "Unauthorized Request");
  }

  try {
    const decodedTokens = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedTokens._id);

    if (!user) {
      throw new apiError(401, "Invalid refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new apiError(400, "Refresh Token are expired or used..");
    }

    const { accessToken, newRefreshToken } = generateAccessAndRefreshToken(
      user?._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(new apiResponse(201, "Access Token Refreshed", {}));
  } catch (error) {
    console.error(error);
    throw new apiError(401, "Invalid or expired refresh token");
  }
});

export { register, login, logout, refreshToken };
