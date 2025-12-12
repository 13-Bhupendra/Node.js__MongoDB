import React from "react";
import "../style/movieCard.css";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { NavLink } from "react-router-dom";


const MovieCard = () => {
  return (
    <div className="container movieCardContainer mb-5 mt-5">
      <div className="row movieCardContent d-flex flex-wrap justify-content-between">
        <NavLink to="/movieDescription" >
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div
                className="movieCard"
                style={{
                backgroundImage: `
                linear-gradient(to top, rgba(0,0,0,0.98), rgba(0,0,0,0.5)),
                url("https://i.pinimg.com/736x/8f/0c/81/8f0c8139d840dc28c0cbf745e4409e17.jpg")
                `,
                }}
            >
                <div className="movieInfo">
                <h5>Inception</h5>
                <div className="tags">
                    <span className="badge bg-primary me-2">Sci-Fi</span>
                    <span className="year">2010</span>
                </div>
                </div>

                <div className="ratingBox">⭐ 8.8</div>

                <div className="visitOverlay">
                        <i className="fas fa-external-link-alt"></i>
                        <span>Visit &nbsp;<LuSquareArrowOutUpRight className="mb-1"/></span>
                    </div>
            </div>
            </div>
        </NavLink>
      </div>
    </div>
  );
};

export default MovieCard;
