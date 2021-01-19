/** @format */

import { combineReducers } from "redux";
import authentication from "./auth";
import forms from "./forms";
import answers from "./answers";
import message from "./message";
import patients from "./patients";

export default combineReducers({
  authentication,
  forms,
  answers,
  message,
  patients,
});
