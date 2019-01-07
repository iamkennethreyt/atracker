import axios from "axios";

import { GET_TEACHERS } from "./types";

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
