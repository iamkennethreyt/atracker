import { GET_SECTIONS, DELETE_SECTION } from "../actions/types";

const initialState = {
  sections: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SECTIONS:
      return {
        ...state,
        sections: action.payload,
        loading: false
      };
    case DELETE_SECTION:
      return {
        ...state,
        sections: state.sections.filter(
          section => section._id !== action.payload._id
        )
      };
    default:
      return state;
  }
}
