import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Timeline } from "../models/timeline.model.js";
import { isValidObjectId } from "mongoose";


const createTimeline=asyncHandler(async(req,res)=>{
    const {title,description,from,to}=req.body;

    if([title,description,from,to].some((field)=>!field || field.trim() === "")){
        throw new ApiError(400,"All Fields Are Required");
    }

   const timeline= await Timeline.create({
        title,
        description,
        timeline:{
            from,
            to
        }
    })

    if(!timeline){
        throw new ApiError(500,"Failed to Create Timeline")
    }

    return res.status(201).json(new ApiResponse(201,timeline,"Timeline Created Succesfully"))

})

const deleteTimeline=asyncHandler(async(req,res)=>{
    const {timelineId}=req.params;

    if(!isValidObjectId(timelineId)){
        throw new ApiError(400,"Invalid Timeline Id")
    }

    await Timeline.findByIdAndDelete(timelineId);

    return res.status(200).json(new ApiResponse(200,timelineId,"Timeline Deleted Succesfully"));


})

const getAllTimeline=asyncHandler(async(req,res)=>{
    const timelines=await Timeline.find();

    return res.status(200).json(new ApiResponse(200,timelines,"Timeline Fetched Succesfully"));

})
export {createTimeline,deleteTimeline,getAllTimeline}