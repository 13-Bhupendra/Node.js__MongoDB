import React, { useEffect, useState } from "react";
import "../style/movieDescription.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDescription = () => {
  const [data, setData] = useState(null);

  const { id } = useParams();
  const SERVER = "http://localhost:7000";

  const movieData = async () => {
    try {
      const res = await axios.get(`${SERVER}/api/movie/${id}`);
      setData(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    movieData();
  }, []);

  if (!data) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="descriptionPage container py-4">
      <div className="row g-4 align-items-start glassBox p-4 mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            className="btn backBtn px-4 py-2"
            onClick={() => history.back()}
          >
            ← Back
          </button>
        </div>

        <div className="col-12 col-md-4 d-flex justify-content-center">
          <img
            src={`${SERVER}${data.filePath}`}
            className="posterImg"
            alt="poster"
          />
        </div>

        <div className="col-12 col-md-8">
          <h1 className="movieTitle mb-3">{data.movieTitle}</h1>

          <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
            <span className="metaTag">{data.genre}</span>
            <span className="metaTag">{data.releaseYear}</span>
            <span className="metaTag rating">⭐ {data.rating}</span>
          </div>

          <p className="descriptionText mb-4">
            {data.description}
          </p>

          <div className="d-flex flex-wrap gap-2 mb-4">
            {data.keywords.map((key, i) => (
              <span className="keyword" key={i}>{key}</span>
            ))}
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
