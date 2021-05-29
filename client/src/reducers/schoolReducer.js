import { FETCH_SCHOOLS, FETCH_SCHOOL } from "../actions/types";

export const schoolReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_SCHOOLS:
      return action.payload;
    case FETCH_SCHOOL:
      if (state.length === 0) {
        return [action.payload];
      }
      return state.map((school) =>
        school._id === action.payload._id ? action.payload : school
      );
    default:
      return state;
  }
};
