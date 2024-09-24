import axiosInstance from "@/helpers/axiosinstance";
import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState={
    loading:false,
    status:false,
    userData:null,
}



export const adminLogin=createAsyncThunk("login",async(data)=>{
    try {
        const response=await axiosInstance.post("/users/login",data);
        toast.success("Login Succesfull")
        return response.data.data.user;
        
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error;
    }
})

export const getCurrentUser=createAsyncThunk("getCurrentUser",async()=>{
    const response=await axiosInstance.get("/users/current-user");
    return response.data.data;
})

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(adminLogin.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(adminLogin.fulfilled,(state,action)=>{
            state.loading=false;
            state.status=true;
            state.userData=action.payload;
        })
        builder.addCase(adminLogin.rejected,(state,action)=>{
            state.loading=false;
            state.status=false;
            state.userData=null;
        })
        builder.addCase(getCurrentUser.pending,(state)=>{
            state.loading=true;
        })
        builder.addCase(getCurrentUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.status=true;
            state.userData=action.payload;
        })
        builder.addCase(getCurrentUser.rejected,(state,action)=>{
            state.loading=false;
            state.status=false;
            state.userData=action.payload;
        })

    }
})



export default authSlice.reducer