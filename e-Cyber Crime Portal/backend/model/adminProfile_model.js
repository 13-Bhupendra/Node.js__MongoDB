import mongoose from "mongoose";

const adminProfileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authCollection",
      required: true,
    },
    name: String,
    email: String,
    phone: String,
  },
  { timestamps: true }
);

export const adminProfile_Collection = mongoose.model(
  "adminProfileCollection",
  adminProfileSchema
);
