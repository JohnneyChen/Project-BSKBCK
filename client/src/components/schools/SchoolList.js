import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import SchoolPreview from "./SchoolPreview";
import { fetchSchools } from "../../actions/index";

class SchoolList extends React.Component {
  componentDidMount() {
    this.props.fetchSchools();
  }

  renderList() {
    return this.props.schools.length ? (
      this.props.schools.map((school) => (
        <SchoolPreview key={school._id} school={school} />
      ))
    ) : (
      <p>No schools yet...</p>
    );
  }

  render() {
    return (
      <div className="mt-2">
        {this.renderList()}
        <Link to="/schools/add" className="btn-block btn btn-success mt-3">
          Add school
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    schools: state.schools,
  };
};

export default connect(mapStateToProps, { fetchSchools })(SchoolList);
