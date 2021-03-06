/** @format */

import {
  GET_PATIENTS_DOCTOR_SUCCESS,
  GET_PATIENTS_DOCTOR_FAIL,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PATIENTS_DOCTOR_SUCCESS:
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
