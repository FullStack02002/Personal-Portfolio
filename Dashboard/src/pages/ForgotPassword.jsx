import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { forgotPassword } from "@/store/Slices/authSlice";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth?.loading);
  const isAuthenticated = useSelector((state) => state.auth?.status);
  const navigate=useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const submit = async (data) => {
    await dispatch(forgotPassword(data));
  };
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className=" min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email to request for reset password
            </p>
          </div>
          <form onSubmit={handleSubmit(submit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", {
                    required: "Email is Required",
                  })}
                />
                {errors.email && (
                  <div className="text-red-700">{errors.email.message}</div>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Link
                    to="/login"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Remember your password?
                  </Link>
                </div>
              </div>
              {!loading ? (
                <Button className="w-full">Forgot Password</Button>
              ) : (
                <SpecialLoadingButton content={"Requesting"} />
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img src="/forgot.png" alt="login" />
      </div>
    </div>
  );
};

export default ForgotPassword;
