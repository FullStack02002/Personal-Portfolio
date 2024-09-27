import React, { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthLayout from "./pages/sub-components/AuthLayout";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageProjects from "./pages/ManageProjects";
import ViewProject from "./pages/ViewProject";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout authentication={true}>
              <HomePage />
            </AuthLayout>
          }
        />
        <Route
          path="/manage/projects"
          element={
            <AuthLayout authentication={true}>
              <ManageProjects />
            </AuthLayout>
          }
        />
        <Route
          path="/view/project/:id"
          element={
            <AuthLayout authentication={true}>
              <ViewProject />
            </AuthLayout>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition:Bounce
      />
    </>
  );
};

export default App;
