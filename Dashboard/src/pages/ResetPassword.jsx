import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { useForm } from "react-hook-form";
import { getCurrentUser, resetPassword } from "@/store/Slices/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth?.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { token } = useParams();

//   for checking newPassword and Confirm Password should Match
  const newPassword = watch("newPassword");

  const submit = async (data) => {
    const response = await dispatch(resetPassword({...data,token}));
    const user = dispatch(getCurrentUser());
    if (response?.payload && user) {
      navigate("/");
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <form onSubmit={handleSubmit(submit)}>
        <div className="min-h-[100vh] flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-balance text-muted-foreground">
                Set a new password
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  {...register("newPassword", {
                    required: "Password is required",
                  })}
                />
                {errors.newPassword && (
                  <div className="text-red-700">
                    {errors.newPassword.message}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === newPassword ||
                      "Confirm Password and Password Should Match",
                  })}
                />
                {errors.confirmPassword && (
                  <div className="text-red-700">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>

              {!loading ? (
                <Button className="w-full">Reset Password</Button>
              ) : (
                <SpecialLoadingButton content={"Resetting Your Password"} />
              )}
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-center items-center bg-muted">
        <img src="/reset.png" alt="login" />
      </div>
    </div>
  );
};

export default ResetPassword;
