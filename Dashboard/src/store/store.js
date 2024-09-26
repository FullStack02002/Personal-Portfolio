import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice"
import timelineSliceReducer from "./Slices/timelineSlice"
import softwareApplicationSliceReducer from "./Slices/softwareApplicationSlice";
import skillsSliceReducer from "./Slices/skillsSlice";
import projectSliceReducer from "./Slices/projectSlice";


const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        timeline:timelineSliceReducer,
        softwareApplication:softwareApplicationSliceReducer,
        skills:skillsSliceReducer,
        projects:projectSliceReducer
    }
})


export default store