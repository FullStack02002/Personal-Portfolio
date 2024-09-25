import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice"
import timelineSliceReducer from "./Slices/timelineSlice"


const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        timeline:timelineSliceReducer
    }
})


export default store