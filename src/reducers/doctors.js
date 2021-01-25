/** @format */

import { GET_DOCTORS_SUCCESS, GET_DOCTORS_FAIL } from "../actions/types";

export default function (state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DOCTORS_SUCCESS:
      return {
        ...state,
        doctors: payload.doctors,
      };
    case GET_DOCTORS_FAIL:
      return {
        ...state,
        doctors: null,
      };
    default:
      return state;
  }
}
