import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SoftwareApplication } from "../models/softwareApplication.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";

const createSoftware = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is required");
  }

  const svgLocalPath = req.files?.svg[0].path;

  if (!svgLocalPath) {
    throw new ApiError(400, "SVG is required");
  }

  const uploadedsvg = await uploadOnCloudinary(svgLocalPath);

  if (!uploadedsvg) {
    throw new ApiError(400, "Failed to upload SVG");
  }

  const software = await SoftwareApplication.create({
    name,
    svg: {
      public_id: uploadedsvg.public_id,
      url: uploadedsvg.secure_url,
    },
  });

  if (!software) {
    throw new ApiError(400, "Failed to create software");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, software, "Software Created Succesfully"));
});

const deleteSoftware = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid ID");
  }

  const software = await SoftwareApplication.findById(id);
  if (!software) {
    throw new ApiError(404, "Software not found");
  }

  await deleteFromCloudinary(software?.svg?.public_id)

  await SoftwareApplication.findByIdAndDelete(id);



  return res.status(200).json(new ApiResponse(200,software,"SoftwareApplication Deleted Succesfully"))
});


const getAllApplication=asyncHandler(async(req,res)=>{
    const software=await SoftwareApplication.find();

    return res.status(200).json(new ApiResponse(200,software,"Sofware Application Fetched Succesfully"))

})

export {createSoftware,deleteSoftware,getAllApplication}