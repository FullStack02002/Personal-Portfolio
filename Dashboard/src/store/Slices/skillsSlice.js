import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/helpers/axiosinstance";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  skills: null,
};

export const createSkill = createAsyncThunk("createSkill", async (data) => {
  try {
    const response = await axiosInstance.post("skill/create", data);
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const deleteSkill = createAsyncThunk("deleteSkill", async ({ id }) => {
  try {
    const response = await axiosInstance.delete(`skill/delete/${id}`);
    toast.success(response.data.message);
    return id;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const updateSkill = createAsyncThunk(
  "updateSkill",
  async ({ proficiency, id }) => {
    try {
      const response = await axiosInstance.put(`skill/update/${id}`, {
        proficiency,
      });
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getAllSkills = createAsyncThunk("getAllSkills", async () => {
  try {
    const response=await axiosInstance.get("skill/getall");
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    makeSkillsEmpty:(state)=>{
        state.skills=null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createSkill.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSkill.fulfilled, (state, action) => {
      state.loading = false;
      state.skills.push(action.payload);
    });
    builder.addCase(createSkill.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteSkill.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSkill.fulfilled, (state) => {
      state.loading = false;
      state.skills = state.skills.filter((skill) => skill._id !== action.payload);
    });
    builder.addCase(deleteSkill.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllSkills.pending,(state)=>{
        state.loading=true;
    })
    builder.addCase(getAllSkills.fulfilled,(state,action)=>{
        state.loading=false;
        state.skills=action.payload;
    })
    builder.addCase(getAllSkills.rejected,(state)=>{
        state.loading=false;
    })
  },
});

export const {makeSkillsEmpty}=skillsSlice.actions;

export default skillsSlice.reducer;
