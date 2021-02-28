/** @format */

import { GET_DOCTOR_SUCCESS, GET_DOCTOR_FAIL } from "../actions/types";

export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DOCTOR_SUCCESS:
      return {
        ...state,
        doctor: payload.doctor,
      };
    case GET_DOCTOR_FAIL:
      return {
        ...state,
        doctor: null,
      };
    default:
      return state;
  }
}
