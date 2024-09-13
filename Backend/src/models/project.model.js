import mongoose from "mongoose"

const projectSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is Required"]
    },
    description:{
        type:String,
        required:[true,"description is Required"]
    },
    gitRepoLink:{
        type:String,
        required:[true,"gitRepoLink is Required"]
    },
    projectLink:{
        type:String,
    },
    technologies:{
        type:String,
        required:[true,"technologies is Required"]
    },
    stack:{
        type:String,
        required:[true,"stack is required"]
    },
    deployed:{
        type:String,
        required:[true,"deployed or not? is required"]
    },
    projectBanner:{
        type:{
            url:String,
            public_id:String
        },
        required:true,
    }

})


export const Project=mongoose.model("Project",projectSchema);