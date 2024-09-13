import mongoose from "mongoose";


const messageSchema=new mongoose.Schema({
    senderName:{
        type:String,
        required:[true,"senderName is Required"]
    },
    subject:{
        type:String,
        required:[true,"subject is required"]
    },
    message:{
        type:String,
        required:[true,"message is required"]
    },
   
},{timestamps:true})


export const Message=mongoose.model("Message",messageSchema)