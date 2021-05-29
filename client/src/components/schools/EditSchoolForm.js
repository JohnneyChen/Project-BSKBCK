import React from "react";
import { connect } from "react-redux";

import SchoolForm from "./SchoolForm";
import { fetchSchool, editSchool } from "../../actions/index";

class EditSchoolForm extends React.Component {
  componentDidMount() {
    this.props.fetchSchool(this.props.match.params._id);
  }

  onSubmit = (formValues, file) => {
    this.props.editSchool(
      this.props.match.params._id,
      formValues,
      file,
      this.props.history
    );
  };

  render() {
    if (!this.props.school) {
      return <div>This school doesn't exist yet...</div>;
    }
    return (
      <div>
        <h3 className="my-2">Edit {this.props.school.name}</h3>
        <SchoolForm
          initialValues={{
            name: this.props.school.name,
            about: this.props.school.about,
            location: this.props.school.location,
            admission: this.props.school.admission,
          }}
          onSubmit={this.onSubmit}
          formFor="edit"
        />
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

export default connect(mapStateToProps, { editSchool, fetchSchool })(
  EditSchoolForm
);
