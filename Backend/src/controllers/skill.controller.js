import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Skill } from "../models/skill.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";

const createSkill = asyncHandler(async (req, res) => {
  const { title, proficiency } = req.body;

  if (!title || !proficiency) {
    throw new ApiError(400, "Please provide both title and proficiency");
  }

  const svgLocalPath = req.files?.svg[0]?.path;

  if (!svgLocalPath) {
    throw new ApiError(400, "Please provide a valid svg file");
  }

  const response = await uploadOnCloudinary(svgLocalPath);
  if (!response) {
    throw new ApiError(500, "Failed to upload image to cloudinary");
  }

  const skill = await Skill.create({
    title,
    proficiency,
    svg: {
      public_id: response?.public_id,
      url: response?.secure_url,
    },
  });

  if (!skill) {
    throw new ApiError(500, "Failed to create skill");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, skill, "Skill Created Succesfully"));
});

const deleteSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid id");
  }

  const skill = await Skill.findById(id);

  if (!skill) {
    throw new ApiError(404, "Skill not found");
  }

  const response = await Skill.findByIdAndDelete(id);

  await deleteFromCloudinary(skill?.svg?.public_id);

  if (!response) {
    throw new ApiError(500, "Failed to delete skill");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, skill, "Skill Deleted successfully"));
});

const getAllSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find();

  if (!skills) {
    throw new ApiError(404, "No skills found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, skills, "Skills Fetched Succesfully"));
});

 const updateSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid id");
  }

  const skill = await Skill.findById(id);

  if (!skill) {
    throw new ApiError(404, "Skill not found");
  }

  const { proficiency } = req.body;

  const updatedSkill = await Skill.findByIdAndUpdate(
    id,
    { $set: { proficiency } },
    { new: true } // This option returns the updated document
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedSkill, "Skill Updated successfully"));
});

export { createSkill, deleteSkill, getAllSkills,updateSkill };
