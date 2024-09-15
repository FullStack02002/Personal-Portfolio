import mongoose from "mongoose";

const skillSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"]
    },
    proficiency:{
        type:Number,
        required:true,
    },
    svg:{
        type:{
            public_id:String,
            url:String,
        },
        required:true
    }
})


export const Skill=mongoose.model("Skill",skillSchema)