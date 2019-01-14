import axios from "axios";

import { GET_SECTIONS, GET_ERRORS, DELETE_SECTION } from "./types";

// Get Sections
export const getSections = () => dispatch => {
  axios
    .get("/api/sections")
    .then(res => {
      dispatch({
        type: GET_SECTIONS,
        payload: res.data
      });
    })
    .catch(err =>
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
      console.log(err)
    );
};

export const registerSection = (sectiondata, history) => dispatch => {
  axios
    .post("/api/sections", sectiondata)
    .then(res => history.push("/sections"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Section
export const deleteSection = id => dispatch => {
  axios
    .delete(`/api/sections/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_SECTION,
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
