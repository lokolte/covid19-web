/** @format */

import { combineReducers } from "redux";
import authentication from "./auth";
import forms from "./forms";
import form from "./form";
import answers from "./answers";
import message from "./message";
import patients from "./patients";
import patient from "./patient";
import patientsDoctor from "./patientsDoctor";
import doctors from "./doctors";
import asignados from "./asignados";
import hospitals from "./hospitals";
import hospital from "./hospital";
import doctor from "./doctor";
import messages from "./messagesPatient";
import coordinators from "./coordinators";
import provinces from "./provinces";
import districts from "./districts";
import questions from "./questions";
import items from "./items";
import item from "./item";
import roles from "./roles";

export default combineReducers({
  authentication,
  forms,
  form,
  answers,
  message,
  patients,
  doctors,
  messages,
  patientsDoctor,
  hospitals,
  hospital,
  asignados,
  doctor,
  coordinators,
  provinces,
  districts,
  patient,
  questions,
  items,
  item,
  roles,
});
