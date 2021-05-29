import axios from "axios";
import { FETCH_SCHOOL, FETCH_SCHOOLS } from "./types";

export const fetchSchool = (schoolId) => async (dispatch) => {
  const school = await axios.get(`/api/schools/${schoolId}`);

  dispatch({ type: FETCH_SCHOOL, payload: school.data });
};

export const postSchool = (values, file, history) => async (dispatch) => {
  const { data } = await axios.get("/api/upload", {
    params: { fileType: file.type },
  });

  await axios.put(data.url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  const ret = await axios.post("/api/schools", {
    ...values,
    image: data.key,
  });

  history.push("/");
  dispatch({ type: FETCH_SCHOOL, payload: ret.data });
};

export const editSchool =
  (schoolId, values, file, history) => async (dispatch) => {
    if (file) {
      const { data } = await axios.get("/api/upload", {
        params: { fileType: file.type },
      });

      await axios.put(data.url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      const ret = await axios.patch(`/api/schools/${schoolId}`, {
        ...values,
        image: data.key,
      });

      history.push(`/schools/${schoolId}`);
      dispatch({ type: FETCH_SCHOOL, payload: ret.data });
    } else {
      const res = await axios.patch(`/api/schools/${schoolId}`, values);

      history.push(`/schools/${schoolId}`);
      dispatch({ type: FETCH_SCHOOL, payload: res.data });
    }
  };

export const fetchSchools = () => async (dispatch) => {
  const response = await axios.get("/api/schools");

  dispatch({ type: FETCH_SCHOOLS, payload: response.data });
};
