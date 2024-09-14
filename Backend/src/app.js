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



// routes declaration

app.use("/api/v1/users",userRouter);
app.use("/api/v1/timeline",timelineRouter)



export {app};