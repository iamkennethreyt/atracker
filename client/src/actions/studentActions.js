import axios from "axios";

import { GET_STUDENTS, GET_ERRORS, GET_STUDENT } from "./types";

// Get Posts
export const getStudents = () => dispatch => {
  axios
    .get("/api/students")
    .then(res => {
      dispatch({
        type: GET_STUDENTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const registerStudent = (userdata, history) => dispatch => {
  axios
    .post("/api/students", userdata)
    .then(res => history.push("/students"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getStudent = id => dispatch => {
  axios
    .get(`/api/students/${id}`)
    .then(res => {
      dispatch({
        type: GET_STUDENT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const updateStudent = (data, history) => dispatch => {
  const { id } = data;
  axios
    .put(`/api/students/${id}`, data)
    .then(res => {
      history.push("/students");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
