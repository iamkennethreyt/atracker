import axios from "axios";

import { GET_TEACHERS, GET_ERRORS, GET_TEACHER } from "./types";

// Get Posts
export const getTeachers = () => dispatch => {
  axios
    .get("/api/teachers")
    .then(res => {
      dispatch({
        type: GET_TEACHERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_TEACHERS,
        payload: null
      })
    );
};

export const registerTeacher = (userdata, history) => dispatch => {
  axios
    .post("/api/teachers", userdata)
    .then(res => history.push("/teachers"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getTeacher = id => dispatch => {
  axios
    .get(`/api/teachers/${id}`)
    .then(res => {
      dispatch({
        type: GET_TEACHER,
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
export const updateTeacher = (data, history) => dispatch => {
  const { id } = data;
  axios
    .put(`/api/teachers/${id}`, data)
    .then(res => {
      history.push("/teachers");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const updatePassword = (data, history) => dispatch => {
  axios
    .put(`/api/teachers/accountsettings/password`, data)
    .then(res => {
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
