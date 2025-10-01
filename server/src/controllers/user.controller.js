import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { User } from "../models/user.models.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await user.save({
    validateBeforeSave: false,
  });

  return { accessToken, refreshToken };
};

const userRegister = asyncHandler(async (req, res) => {
  // 1. Get user details from request body
  // 2. Validate that all required fields are present
  // 3. Check if user already exists (by username or email)
  // 4. Check for avatar file and upload to Cloudinary
  // 5. Create new user in the database
  // 6. Generate access and refresh tokens
  // 7. Remove password and refresh token from the user object to be sent in the response
  // 8. Set cookies and send response

  const { username, email, fullName, password } = req.body;

  console.log("username:", username);
  console.log("email:", email);
  console.log("fullName:", fullName);
  console.log("password:", password);

  //   if (
  //     ![username, email, fullName, password].some((field) => !field || field?.trim() == "")
  //   ) {
  //     throw new apiError(400, "All fields are required");
  //   }

  if (
    [username, email, fullName, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new apiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new apiError(400, "User already Exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new apiError(400, "Failed to upload on cloudinary");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email: email,
    password: password,
    avatar: avatar.url,
    fullName: fullName,
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200, createdUser, "User registered successfully"));
});

const userLogin = asyncHandler(async (req, res) => {
  // take credentials
  // check if not empty
  // find the user
  // check if password is correct
  // generate access and refresh token
  // send cookies

  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new apiError(404, "User not Found....");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

console.log('Entered Password:', password);
console.log('Stored Hash:', user.password);
console.log('Is Password Valid:', isPasswordValid);

  if (!isPasswordValid) {
    throw new apiError(400, "Invalid Password");
  }


  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id
  );

  if (!accessToken || !refreshToken) {
    throw new apiError(500, "Failed to generate tokens");
  }

  const loggedInUser = await User.findOne({ email }).select(
    "-password -refreshToken"
  );

  if (!loggedInUser) {
    throw new apiError(500, "Failed to find user");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully..."
      )
    );
});

const userLogOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      refreshToken: 1,
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User Log out successfully..."));
});

const userProfile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new apiResponse(200, req.user, "User profile fetched successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  // take old and new password
  // check if not empty
  // find the user on basis of cookie
  // check the old passowrd
  // update the password
  // send response

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new apiError(400, "Old and new password are required");
  }

  if (oldPassword === newPassword) {
    throw new apiError(400, "Old and new password cannot be same");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new apiError(404, "User not found..");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new apiError(400, "Old password is wrong...");
  }

  user.password = password;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Password change Successfully.."));
});

const changeName = asyncHandler(async (req, res) => {
  const { fullName } = req.body;

  if (!fullName) {
    throw new apiError(400, "Above field is required...");
  }

  if (fullName === req.user?.fullName) {
    throw new apiError(
      400,
      "New Name cannot be the same as the current Name..."
    );
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(new apiResponse(200, user, "Name changed successfully..."));
});

const changeUsername = asyncHandler(async (req, res) => {
  const { username } = req.body;

  if (!username) {
    throw new apiError(400, "Username is required....");
  }

  if (username === req.user?.username) {
    throw new apiError(
      400,
      "New username cannot be the same as the current username..."
    );
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { username },
    },
    {
      new: true,
    }
  ).select("password");

  return res
    .status(200)
    .json(new apiResponse(200, user, "Username change successfully.."));
});

export {
  userRegister,
  userLogin,
  userLogOut,
  userProfile,
  changePassword,
  changeName,
  changeUsername,
};
