import { GET_TEACHERS, GET_TEACHER } from "../actions/types";

const initialState = {
  teachers: [],
  teacher: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEACHERS:
      return {
        ...state,
        teachers: action.payload,
        loading: false
      };
    case GET_TEACHER:
      return {
        ...state,
        teacher: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
