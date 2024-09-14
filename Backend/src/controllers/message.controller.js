import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Message } from "../models/message.model.js";
import { isValidObjectId } from "mongoose";

 const createMessage = asyncHandler(async (req, res) => {
  const { senderName, subject, message } = req.body;

  if (
    [senderName, subject, message].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "Please fill all fields");
  }

  const createdMessage = await Message.create({
    senderName,
    subject,
    message,
  });

  if (!createdMessage) {
    throw new ApiError(500, "Failed to create message");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdMessage, "Message Created Succesfully"));
});

 const deleteMessage=asyncHandler(async(req,res)=>{
    const {id}=req.params;

    if(!isValidObjectId(id)){
        throw new ApiError(400,"Invalid message id");
    }

    const message=await Message.findById(id);

    if(!message){
        throw new ApiError(404,"Message not found");
    }

    await Message.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200,message,"Message Deleted Succesfully"))
})


 const getAllMessage=asyncHandler(async(req,res)=>{
    const messages=await Message.find();
    return res.status(200).json(new ApiResponse(200,messages,"Message Fetched Succesfully"));
  
})

export {createMessage,deleteMessage,getAllMessage}