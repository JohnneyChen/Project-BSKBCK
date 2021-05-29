import React from "react";
import { reduxForm, Field } from "redux-form";

class SchoolForm extends React.Component {
  state = { file: null, tiredSubmit: false };

  renderError({ error, touched }) {
    if (error && touched) {
      return <div className="invalid-feedback">{error}</div>;
    }
  }

  renderInput = ({ input, label, type, meta }) => {
    const className = `form-control ${
      meta.error && meta.touched ? "is-invalid" : ""
    }`;

    return (
      <div className="row mb-3">
        <label htmlFor={label} className="form-label">
          {label}
        </label>
        {type === "textarea" ? (
          <textarea {...input} className={className} />
        ) : (
          <input {...input} type={type} className={className} />
        )}
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit((formValues) =>
          this.props.onSubmit(formValues, this.state.file)
        )}
      >
        <label htmlFor="file" className="form-label mt-3">
          Image (gif, jpeg, jpg, png)
        </label>
        <div className="mb-3">
          <input
            className={"form-control " + this.state.file ? "" : "is-invalid"}
            type="file"
            accept="image/*"
            onChange={(e) => this.setState({ file: e.target.files[0] })}
          ></input>
          {!this.state.file &&
          this.state.tiredSubmit &&
          this.props.formFor !== "edit" ? (
            <div className="alert alert-danger mt-2" role="alert">
              file is required
            </div>
          ) : null}
        </div>

        <Field
          name="name"
          component={this.renderInput}
          label="name"
          type="text"
        />
        <Field
          name="about"
          component={this.renderInput}
          label="about"
          type="textarea"
        />
        <Field
          name="location"
          component={this.renderInput}
          label="location"
          type="textarea"
        />
        <Field
          name="admission"
          component={this.renderInput}
          label="admission"
          type="textarea"
        />
        <button
          className="btn-success btn"
          onClick={() => this.setState({ tiredSubmit: true })}
        >
          Submit
        </button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "name is required";
  }

  return errors;
};

export default reduxForm({ form: "school", validate })(SchoolForm);
