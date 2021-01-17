/** @format */

import { combineReducers } from "redux";
import authentication from "./auth";
import forms from "./forms";
import answers from "./answers";
import message from "./message";

export default combineReducers({
  authentication,
  forms,
  answers,
  message,
});
