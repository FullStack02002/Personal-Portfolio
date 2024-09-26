import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice"
import timelineSliceReducer from "./Slices/timelineSlice"
import softwareApplicationSlice from "./Slices/softwareApplicationSlice";


const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        timeline:timelineSliceReducer,
        softwareApplication:softwareApplicationSlice
    }
})


export default store