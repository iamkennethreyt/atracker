import axios from "axios";

import { GET_ERRORS } from "./types";

//Register User
export const registerUser = (userdata, history) => dispatch => {
  axios
    .post("/api/users/register", userdata)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
