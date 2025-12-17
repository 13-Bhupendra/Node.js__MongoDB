import React from "react";

const EditMovieForm = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 glassFormWrapper">
          <div className="glassGlow"></div>

          <h1 className="text-center fs-1 formTitle">
            Add <span style={{ color: "#d2ff27" }}>Movie</span>
          </h1>
          <p className="text-center">
            Browse, search, and manage your entire movie collection in one place
          </p>

          <div className="glassForm p-4 mt-5">
            <div className="mb-3">
              <label className="formLabel mb-2">
                <FaFilm /> Movie Title
              </label>
              <input
                type="text"
                className="form-control glassInput"
                placeholder="Enter movie title"
              />
            </div>

            <div className="mb-3 mt-4">
              <label className="formLabel mb-2">
                <FaPen /> Description
              </label>
              <textarea
                className="form-control glassInput"
                rows="4"
                placeholder="Write movie description"
              ></textarea>
            </div>

            <div className="mb-3 mt-4">
              <label className="formLabel mb-2">
                <FaTags /> Genre
              </label>
              <input
                type="text"
                className="form-control glassInput"
                placeholder="Action, Drama, Sci-Fi"
              />
            </div>

            <div className="row g-3 mt-4">
              <div className="col-md-4">
                <label className="formLabel mb-2">
                  <FaCalendarAlt /> Release Year
                </label>
                <input
                  type="number"
                  className="form-control glassInput"
                  placeholder="2025"
                />
              </div>
              <div className="col-md-4">
                <label className="formLabel mb-2">
                  <FaStar /> Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control glassInput"
                  placeholder="8.5"
                />
              </div>
              <div className="col-md-4">
                <label className="formLabel mb-2">
                  <FaClock /> Duration
                </label>
                <input
                  type="number"
                  className="form-control glassInput"
                  placeholder="120 min"
                />
              </div>
            </div>

            <div className="mb-3 mt-4">
              <label className="formLabel mb-2">
                <FaKey /> Keywords
              </label>
              <input
                type="text"
                className="form-control glassInput"
                placeholder="hero, action, thriller"
              />
            </div>

            <div className="mb-4 mt-4">
              <label className="formLabel mb-2">
                <FaImage /> Movie Poster
              </label>

              <label htmlFor="posterUpload" className="uploadBox">
                {file ? (
                  <IoCloudDoneSharp className="uploadIcon" />
                ) : (
                  <FaUpload className="uploadIcon" />
                )}
                <div>{file ? file.name : "Click to upload poster"}</div>
              </label>

              <input
                type="file"
                id="posterUpload"
                className="hiddenFile"
              />
            </div>

            <div className="d-flex justify-content-center mt-5">
              <button
                type="submit"
                className="btn submitBtn px-4 py-2"
              >
                Add Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovieForm;
