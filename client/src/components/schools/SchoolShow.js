import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSchool } from "../../actions/index";

class SchoolShow extends React.Component {
  componentDidMount() {
    this.props.fetchSchool(this.props.match.params._id);
  }

  renderDisplay() {
    return this.props.school ? this.displaySchool() : <p>Loading...</p>;
  }

  displaySchool() {
    return (
      <div className="card my-3">
        <img
          src={
            "https://dreamschool-image-bucket-jc.s3.us-east-2.amazonaws.com/" +
            this.props.school.image
          }
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{this.props.school.name}</h5>
          <p className="card-text">{this.props.school.about}</p>
          <p className="card-text">
            <small className="text-muted">
              {this.props.school.location
                ? "Location: " + this.props.school.location
                : ""}
            </small>
          </p>
          <p className="card-text">
            {this.props.school.admission
              ? "Admission: " + this.props.school.admission
              : ""}
          </p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderDisplay()}
        <Link
          to={`/schools/${this.props.match.params._id}/edit`}
          className="btn btn-primary btn-large"
        >
          Edit post
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    school: state.schools.find(
      (school) => school._id === ownProps.match.params._id
    ),
  };
};

export default connect(mapStateToProps, { fetchSchool })(SchoolShow);
