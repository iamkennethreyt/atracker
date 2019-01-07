import { GET_TEACHERS } from "../actions/types";

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
    default:
      return state;
  }
}
