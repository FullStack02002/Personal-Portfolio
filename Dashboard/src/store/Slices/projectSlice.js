import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/helpers/axiosinstance";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  projects: null,
  project:null
};

export const createProject = createAsyncThunk("createProject", async (data) => {
  try {
    const response = await axiosInstance.post("project/create", data);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const deleteProject = createAsyncThunk(
  "deleteProject",
  async ({ id }) => {
    try {
      const response = await axiosInstance.delete(`project/delete/{id}`);
      toast.success(response.data.message);
      return id;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getAllProjects = createAsyncThunk("getAllProjects", async () => {
  try {
    const response = await axiosInstance.get("project/getall");
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const getProjectById = createAsyncThunk(
  "getProjectById",
  async ({ id }) => {
    try {
      const response = await axiosInstance.get(`project/get/${id}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    makeProjectsEmpty: (state) => {
      state.projects = null;
    },
    makeProjectEmpty:(state)=>{
        state.project = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProjects.pending,(state)=>{
        state.loading=true;
    })
    builder.addCase(getAllProjects.fulfilled,(state,action)=>{
        state.loading=false;
        state.projects=action.payload;
    })
    builder.addCase(getAllProjects.rejected,(state)=>{
        state.loading=false;
    })
    builder.addCase(createProject.pending,(state)=>{
        state.loading=true;
    })
    builder.addCase(createProject.fulfilled,(state,action)=>{
        state.loading=false;
        state.projects.push(action.payload);
    })
    builder.addCase(createProject.rejected,(state)=>{
        state.loading=false;
        state.projects=null;
    })
    builder.addCase(deleteProject.pending,(state)=>{
        state.loading=true;
    })
    builder.addCase(deleteProject.fulfilled,(state,action)=>{
        state.loading=false;
        state.projects=projects.filter(project=>project._id!==action.payload.id);
    })
    builder.addCase(deleteProject.rejected,(state)=>{
        state.loading=false;
    })
    builder.addCase(getProjectById.pending,(state)=>{
        state.loading=true;
    })
    builder.addCase(getProjectById.fulfilled,(state,action)=>{
        state.loading=false;
        state.project=action.payload;
    })
    builder.addCase(getProjectById.rejected,(state,action)=>{
        state.loading=false;
        state.project=null;
    })
  },
});

export const { makeProjectsEmpty } = projectSlice.actions;

export default projectSlice.reducer;
