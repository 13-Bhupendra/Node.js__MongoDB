import React, { useEffect, useState } from "react";
import "../style/movieCard.css";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import axios from "axios";

const MovieCard = () => {
  const [data, setData] = useState([]);

  const SERVER = "http://localhost:7000";

  const fetchData = async () => {
    const res = await axios.get(`${SERVER}/api/get`);
    setData(res.data.MoviesData || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container movieCardContainer mb-5 mt-5">
      <div className="row movieCardContent">
        {data.map((el, i) => (
          <div
            key={i}
            className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4"
          >
            {console.log(`${SERVER}${el.filePath}`)}
            <NavLink
              to="/movieDescription"
              className="text-decoration-none"
            >
              <div
                className="movieCard"
                style={{
                  backgroundImage: `
                    linear-gradient(to top, rgba(0,0,0,0.98), rgba(0,0,0,0.5)),
                    url(${SERVER}${el.filePath})
                  `,
                }}
              >
                <div className="movieInfo">
                  <h5>{el.movieTitle}</h5>
                  <div className="tags">
                    <span className="badge bg-primary me-2">
                      {el.genre}
                    </span>
                    <span className="year">{el.releaseYear}</span>
                  </div>
                </div>

                <div className="ratingBox">⭐ {el.rating}</div>

                <div className="visitOverlay">
                  <span>
                    Visit <LuSquareArrowOutUpRight className="mb-1" />
                  </span>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
