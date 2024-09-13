import mongoose from "mongoose";

const softwareApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is Required"],
  },
  svg: {
    type: {
      url: String,
      public_id: String,
    },
    required: [true, "svg is required"],
  },
});

export const SoftwareApplication = mongoose.model(
  "SoftwareApplication",
  softwareApplicationSchema
);
