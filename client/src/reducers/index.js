import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";

import { schoolReducer } from "./schoolReducer";

export default combineReducers({
  form: reduxForm,
  schools: schoolReducer,
});
