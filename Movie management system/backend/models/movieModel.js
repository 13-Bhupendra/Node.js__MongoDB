import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    movieTitle: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: [String], required: true }, 
    releaseYear: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 10 }, 
    duration: { type: Number },   
    keywords: { type: [String] }, 
    fileName: { type: String }, 
    filePath: { type: String }
  },
  {
    timestamps: true
  }
);

export const Movies = mongoose.model("movies" , movieSchema)