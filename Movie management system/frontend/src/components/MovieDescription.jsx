import React from "react";
import "../style/movieDescription.css";

const MovieDescription = () => {
  return (
    <div className="descriptionPage container py-4">

      <div className="row g-4 align-items-start glassBox p-4 mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn backBtn px-4 py-2" onClick={()=> history.back()}>← Back</button>
        </div>

        <div className="col-12 col-md-4 d-flex justify-content-center">
          <img
            src="https://i.pinimg.com/736x/8f/0c/81/8f0c8139d840dc28c0cbf745e4409e17.jpg"
            className="posterImg"
            alt="poster"
          />
        </div>

        <div className="col-12 col-md-8">
          <h1 className="movieTitle mb-3">Inception</h1>

          <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
            <span className="metaTag">Sci-Fi</span>
            <span className="metaTag">2010</span>
            <span className="metaTag rating">⭐ 8.8</span>
          </div>

          <p className="descriptionText mb-4">
            A skilled thief is given a chance at redemption if he can successfully
            perform inception — planting an idea inside a target’s subconscious.
            A mind-bending journey through dreams, reality, and the human mind.
          </p>

          <div className="d-flex flex-wrap gap-2 mb-4">
            <span className="keyword">Dream</span>
            <span className="keyword">Mind Control</span>
            <span className="keyword">Thriller</span>
            <span className="keyword">Heist</span>
            <span className="keyword">Christopher Nolan</span>
          </div>

          <div className="d-flex gap-3">
            <button className="btn editBtn px-4 py-2">Edit</button>
            <button className="btn deleteBtn px-4 py-2">Delete</button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default MovieDescription;
