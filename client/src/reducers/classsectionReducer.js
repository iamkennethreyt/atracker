import {
  GET_CLASSSECTION,
  GET_CLASSSECTIONS,
  PUT_CLASSSECTIONS
} from "../actions/types";

const initialState = {
  classsections: [],
  classsection: {},
  students: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLASSSECTIONS:
      return {
        ...state,
        classsections: action.payload,
        loading: false
      };
    case GET_CLASSSECTION:
      return {
        ...state,
        classsection: action.payload,
        students: action.payload.students
      };
    case PUT_CLASSSECTIONS:
      return {
        ...state,
        students: [action.payload, ...state.students]
      };
    default:
      return state;
  }
}
