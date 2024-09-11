import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
  } = req.body;

  if (
    [
      fullName,
      email,
      phone,
      aboutMe,
      password,
      portfolioURL,
      githubURL,
      instagramURL,
      twitterURL,
      facebookURL,
      linkedInURL,
    ].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const resumeLocalPath = req.files?.resume[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  if (!resumeLocalPath) {
    throw new ApiError(400, "Resume is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const resume = await uploadOnCloudinary(resumeLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar");
  }

  if (!resume) {
    throw new ApiError(500, "Failed to upload resume");
  }

  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
    avatar: {
      public_id: avatar.public_id,
      url: avatar.secure_url,
    },
    resume: {
      public_id: resume.public_id,
      url: resume.secure_url,
    },
  });

  const createdUser = await User.findById(user?._id);

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Succesfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user Credentials");
  }

  const jwtToken = await user.generateJwtToken();

  const loggedInUser = await User.findById(user?._id);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
  };

  return res
    .status(200)
    .cookie("jwtToken", jwtToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
        },
        "User logged in Succesfully "
      )
    );
});

const logoutUser=asyncHandler(async(req,res)=>{
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires:new Date(0),
    path: "/",
  };

  res.status(200).cookie("jwtToken","",options).json(new ApiResponse(200,{},"User logged out successfully"));

})

export { registerUser, loginUser ,logoutUser};
