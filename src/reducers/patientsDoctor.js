/** @format */

import {
  GET_PATIENTS_DOCTOR_SUCCESS,
  GET_PATIENTS_DOCTOR_FAIL,
  GET_PATIENT_SUCCESS,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PATIENTS_DOCTOR_SUCCESS:
      console.log("getPatients reducer : ", payload.patientsDoctor);
      return {
        ...state,
        patientsDoctor: payload.patientsDoctor,
      };
    case GET_PATIENTS_DOCTOR_FAIL:
      return {
        ...state,
        patientsDoctor: null,
      };
    default:
      return state;
  }
}
