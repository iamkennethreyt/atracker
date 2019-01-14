import axios from "axios";

import { GET_CLASSSECTIONS, GET_ERRORS, GET_CLASSSECTION } from "./types";

// Get Posts
export const getClassSections = () => dispatch => {
  axios
    .get("/api/classsections")
    .then(res => {
      dispatch({
        type: GET_CLASSSECTIONS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_CLASSSECTIONS,
        payload: err.response.data
      })
    );
};

export const registerClassSection = (csData, history) => dispatch => {
  axios
    .post("/api/classsections", csData)
    .then(res => history.push("/classsections"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getClassSection = id => dispatch => {
  axios
    .get(`/api/classsections/${id}`)
    .then(res => {
      dispatch({
        type: GET_CLASSSECTION,
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
export const registerStudent = (data, history) => dispatch => {
  const { student, link } = data;

  console.log(data);
  axios
    .put(`/api/classsections/register/${link.id}`, { student })
    .then(res => history.push(`/classsections/${link.id}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
