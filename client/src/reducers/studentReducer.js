import { GET_STUDENTS, GET_STUDENT } from "../actions/types";

const initialState = {
  students: [],
  student: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false
      };
    case GET_STUDENT:
      return {
        ...state,
        student: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
