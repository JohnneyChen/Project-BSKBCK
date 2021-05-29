import React from "react";
import { Link } from "react-router-dom";

const SchoolPreview = ({
  school: { name, image, location, about, admission, _id },
}) => {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={
              "https://dreamschool-image-bucket-jc.s3.us-east-2.amazonaws.com/" +
              image
            }
          />
        </div>
        <div className="ml-3 col-md-7">
          <div className="card-body">
            <Link to={`/schools/${_id}`}>
              <h5 className="card-title">{name}</h5>
            </Link>
            <p className="card-text">{about}</p>
            <p className="card-text">
              <small className="text-muted">
                {location ? "Location:" + location : ""}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolPreview;
