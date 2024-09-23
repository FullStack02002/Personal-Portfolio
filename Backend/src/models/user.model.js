import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken"; // You need to import jwt if you're using it

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required!"],
  },
  email: {
    type: String,
    required: [true, "Email Required!"],
  },
  phone: {
    type: String,
    required: [true, "Phone Required!"],
  },
  aboutMe: {
    type: String,
    required: [true, "About Me Section is Required"],
  },
  password: {
    type: String,
    required: [true, "Password Required!"],
    minLength: [8, "Passsword Must Contain At Least 8 Characters!"],
    select: false, // By default, password won't be returned in queries
  },
  avatar: {
    type: {
      public_id: String,
      url: String
    },
    required: true
  },
  resume: {
    type: {
      public_id: String,
      url: String
    },
    required: true
  },
  portfolioURL: {
    type: String,
    required: [true, "Portfolio URL Required"],
  },
  githubURL: String,
  instagramURL: String,
  twitterURL: String,
  linkedInURL: String,
  facebookURL: String,
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordExpire: {
    type: Date, // Use Date for expiration times
    select: false,
  }
});

// Hashing password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT token
userSchema.methods.generateJwtToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    }
  );
};

// Method to generate reset password token
userSchema.methods.generateResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing the token and setting it to the schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Setting token expiration time (15 minutes)
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
