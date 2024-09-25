import axiosInstance from "@/helpers/axiosinstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  timeline:null,
};

export const createTimeline = createAsyncThunk(
  "createTimeline",
  async (data) => {
    try {
      const response = await axiosInstance.post("/timeline/create", data);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const deleteTimeline = createAsyncThunk(
  "deleteTimeline",
  async ({ id }) => {
    try {
      const response = await axiosInstance.delete(`timeline/delete/${id}`);
      toast.success(response.data.message);
      return id;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getAllTimeline = createAsyncThunk("getAllTimeline", async () => {
  try {
    const response = await axiosInstance.get("timeline/getall");
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    makeTimelineEmpty:(state)=>{
        state.timeline=null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createTimeline.pending,(state)=>{
        state.loading=true;
    })
    builder.addCase(createTimeline.fulfilled,(state,action)=>{
        state.loading=false;
        timeline.push(action.payload);
    })
    builder.addCase(createTimeline.rejected,(state)=>{
        state.loading=false;
    })
    builder.addCase(deleteTimeline.pending,(state)=>{
        state.loading=true;
    })
    builder.addCase(deleteTimeline.fulfilled,(state,action)=>{
        state.loading=false;
        state.timeline = state.timeline.filter((timeline) => timeline.id !== action.payload);
    })
    builder.addCase(deleteTimeline.rejected,(state)=>{
        state.loading=false;
    })
    builder.addCase(getAllTimeline.pending,(state)=>{
        state.loading=true;
    })
    builder.addCase(getAllTimeline.fulfilled,(state,action)=>{
        state.loading=false;
        state.timeline = action.payload;
    })
    builder.addCase(getAllTimeline.rejected,(state)=>{
        state.loading=false;
        state.timeline=null;
    })
  },
});

export const {makeTimelineEmpty}=timelineSlice.actions;

export default timelineSlice.reducer;
