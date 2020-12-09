/** @format */

import { combineReducers } from "redux";
import authentication from "./auth";
import message from "./message";

export default combineReducers({
  authentication,
  message,
});
