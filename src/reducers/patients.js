/** @format */

import { GET_PATIENTS_SUCCESS, GET_PATIENTS_FAIL } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: payload.patients,
      };
    case GET_PATIENTS_FAIL:
      return {
        ...state,
        patients: null,
      };
    default:
      return state;
  }
}
