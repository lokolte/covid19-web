/** @format */

import {
  GET_FORMS_PATIENT_SUCCESS,
  GET_FORMS_PATIENT_FAIL,
} from "../actions/types";

export default function (state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FORMS_PATIENT_SUCCESS:
      return {
        ...state,
        formsPatient: payload.formsPatient,
      };
    case GET_FORMS_PATIENT_FAIL:
      return {
        ...state,
        formsPatient: null,
      };
    default:
      return state;
  }
}
