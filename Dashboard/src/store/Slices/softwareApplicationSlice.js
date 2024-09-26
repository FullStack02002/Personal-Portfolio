import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/helpers/axiosinstance";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  applications: null,
  deleting:false,
};

export const createApplication = createAsyncThunk(
  "createApplication",
  async (data) => {
    try {
      const response = await axiosInstance.post("software/create", data);
      toast.success(response.data?.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const deleteApplication = createAsyncThunk(
  "deleteApplication",
  async ({ id }) => {
    try {
      const response = await axiosInstance.delete(`/software/delete/${id}`);
      toast.success(response.data?.message);
      return id;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getAllApplication = createAsyncThunk(
  "getAllApplication",
  async () => {
    try {
      const response = await axiosInstance.get("software/getall");
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const softwareApplicationSlice = createSlice({
  name: "softwareApplication",
  initialState,
  reducers: {
    makeapplicationsEmpty:(state)=>{
      state.applications = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createApplication.pending,(state)=>{
      state.loading=true;
    })
    builder.addCase(createApplication.fulfilled,(state,action)=>{
      state.loading=false;
      state.applications.push(action.payload);
    })
    builder.addCase(createApplication.rejected,(state)=>{
      state.loading=false;
      state.applications=null;
    })
    builder.addCase(deleteApplication.pending,(state)=>{
      state.deleting=true;
    })
    builder.addCase(deleteApplication.fulfilled,(state,action)=>{
      state.deleting=false;
      state.applications=state.applications.filter(item=>item._id!==action.payload);
    })
    builder.addCase(deleteApplication.rejected,(state)=>{
      state.deleting=false;
    })
    builder.addCase(getAllApplication.pending,(state)=>{
      state.loading=true;
    })
    builder.addCase(getAllApplication.fulfilled,(state,action)=>{
      state.loading=false;
      state.applications=action.payload;
    })
    builder.addCase(getAllApplication.rejected,(state)=>{
      state.loading=false;
    })
  },
});

export const {makeapplicationsEmpty}=softwareApplicationSlice.actions;

export default softwareApplicationSlice.reducer;
