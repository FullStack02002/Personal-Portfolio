import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";
import { uploadOnCloudinary,deleteFromCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";

const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;

  if (
    [
      title,
      description,
      gitRepoLink,
      projectLink,
      technologies,
      stack,
      deployed,
    ].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const projectBannerLocalPath = req.files?.projectBanner[0].path;
  if (!projectBannerLocalPath) {
    throw new ApiError(400, "Please upload a banner");
  }

  const projectBanner = await uploadOnCloudinary(projectBannerLocalPath);

  if (!projectBanner) {
    throw new ApiError(500, "Failed to upload banner to cloudinary");
  }

  const createdProject = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
    projectBanner: {
      public_id: projectBanner.public_id,
      url: projectBanner.secure_url,
    },
  });

  if (!createProject) {
    throw new ApiError(500, "Failed to create project");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdProject, "Project Created Succesfully"));
});

 const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid project id");
  }

  const project = await Project.findById(id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const response = await Project.findByIdAndDelete(id);

  await deleteFromCloudinary(project?.projectBanner?.public_id);

  if (!response) {
    throw new ApiError(500, "Failed to delete project");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project Delted Succesfully"));
});

const getAllProjects=asyncHandler(async(req,res)=>{
    const projects=await Project.find();
    if(!projects){
        throw new ApiError(404,"No projects found");
    }
    return res.status(200).json(new ApiResponse(200,projects,"Project Fetched Succesfully"))
})

const getProjectById=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    if(!isValidObjectId){
        throw new ApiError(400,"Invalid project id");
    }

    const project=await Project.findById(id);

    if(!project){
        throw new ApiError(404,"Project not found");
    }

    return res.status(200).json(new ApiResponse(200,project,"Project Fetched Succesfully"))
})

const updateProject=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const newProjectData={
        title:req.body.title,
        description:req.body.description,
        stack:req.body.stack,
        technologies:req.body.technologies,
        deployed:req.body.deployed,
        projectLink:req.body.projectLink,
        gitRepoLink:req.body.gitRepoLink
    }
    if(req.files && req.files.projectBanner){
        const projectBannerLocalPath=req.files?.projectBanner[0].path;
        if(!projectBannerLocalPath){
            throw new ApiError(400,"No project banner uploaded");
        }
        const project=await Project.findById(id);
        if(!project){
            throw new ApiError(404,"Project not found");
        }
        await deleteFromCloudinary(project?.projectBanner?.public_id);
        const newImage=await uploadOnCloudinary(projectBannerLocalPath);
        if(!newImage){
            throw new ApiError(400,"Failed to upload project banner");
        }
        newProjectData.projectBanner={
            public_id:newImage?.public_id,
            url:newImage?.secure_url
        }



    }

    const project=await Project.findByIdAndUpdate(
        id,newProjectData,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        }
    )
    if(!project){
        throw new ApiError(404,"Project not found");
    }

    return res.status(200).json(new ApiResponse(200,project,"Project Updated Succesfully"))


})



export { createProject,deleteProject,getAllProjects,getProjectById,updateProject };
