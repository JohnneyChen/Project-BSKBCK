import React from "react";
import { connect } from "react-redux";

import SchoolForm from "./SchoolForm";
import { postSchool } from "../../actions/index";

class NewSchoolForm extends React.Component {
  onSubmit = (formValues, file) => {
    if (file) {
      this.props.postSchool(formValues, file, this.props.history);
    }
  };

  render() {
    return (
      <div>
        <h3 className="my-2">Add a School</h3>
        <SchoolForm onSubmit={this.onSubmit} formFor="new" />
      </div>
    );
  }
}

export default connect(null, { postSchool })(NewSchoolForm);
