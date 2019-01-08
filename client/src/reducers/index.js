import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import teacherReducer from "./teacherReducer";
import studentReducer from "./studentReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  teachers: teacherReducer,
  students: studentReducer
});
