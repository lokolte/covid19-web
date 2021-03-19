/** @format */

import { GET_PATIENT_SUCCESS, GET_PATIENT_FAIL } from "../actions/types";

export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PATIENT_SUCCESS:
      return {
        ...state,
        patient: payload.patient,
      };
    case GET_PATIENT_FAIL:
      return {
        ...state,
        patient: null,
      };
    default:
      return state;
  }
}
