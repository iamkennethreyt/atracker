import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import teacherReducer from "./teacherReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  teachers: teacherReducer
});
