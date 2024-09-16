import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));


app.use(express.json({}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("App Running")
})

//route import 
import userRouter from "./routes/user.routes.js"
import timelineRouter from "./routes/timeline.routes.js"
import messageRouter from "./routes/message.routes.js"
import projectRouter from "./routes/project.routes.js"
import skillRouter from "./routes/skill.routes.js"
import softwareApplicationRouter from "./routes/softwareApplication.routes.js"



// routes declaration

app.use("/api/v1/users",userRouter);
app.use("/api/v1/timeline",timelineRouter)
app.use("/api/v1/message",messageRouter)
app.use("/api/v1/project",projectRouter)
app.use("/api/v1/skill",skillRouter)
app.use("/api/v1/software",softwareApplicationRouter)



export {app};