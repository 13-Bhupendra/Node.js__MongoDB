import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/MovieData");
    console.log("server connected successfully..........!");
  } catch (error) {
    console.log("Error : ", error.message);
  }
};
