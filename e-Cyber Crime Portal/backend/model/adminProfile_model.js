import mongoose from "mongoose";

const adminProfileSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    role : String,
    phone: String,
    designation : String,
    city : String,
    state : String
  },
  { timestamps: true }
);

export const adminProfile_Collection = mongoose.model(
  "adminProfileCollection",
  adminProfileSchema
);
