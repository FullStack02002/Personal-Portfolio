import axiosInstance from "@/helpers/axiosinstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  status: false,
  userData: null,
};

export const adminLogin = createAsyncThunk("login", async (data) => {
  try {
    const response = await axiosInstance.post("/users/login", data);
    toast.success("Login Succesfull");
    return response.data.data.user;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  const response = await axiosInstance.get("/users/current-user");
  return response.data.data;
});

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (data) => {
    try {
      const response = await axiosInstance.post("/users/forgot-password", data);
      toast.success(`Email Sent to ${data.email} succesfully`);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const resetPassword = createAsyncThunk("resetPassword", async (data) => {
  try {
    const { token, newPassword, confirmPassword } = data;
    const response = await axiosInstance.post(
      `/users/reset-password/${token}`,
      {
        newPassword,
        confirmPassword,
      }
    );
    toast.success("Password Changed Succesfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const logOut = createAsyncThunk("logOut", async () => {
  try {
    const response = await axiosInstance.post("/users/logout");
    toast.success("Admin Logged Out Succesfully");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const updateAccount = createAsyncThunk("updateAccount", async (data) => {
  try {
    const response = await axiosInstance.patch("/users/update-profile");
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(adminLogin.rejected, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.status = false;
      state.userData = action.payload;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
    builder.addCase(logOut.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateAccount.pending,(state)=>{
      state.loading=true;
    })
    builder.addCase(updateAccount.fulfilled,(state,action)=>{
      state.loading=false;
      state.userData=action.payload;
    })
    builder.addCase(updateAccount.rejected,(state)=>{
      state.loading=false;
    })
  },
});

export default authSlice.reducer;
