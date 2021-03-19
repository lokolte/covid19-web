/** @format */

import { GET_HOSPITAL_SUCCESS, GET_HOSPITAL_FAIL } from "../actions/types";

export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_HOSPITAL_SUCCESS:
      return {
        ...state,
        hospital: payload.hospital,
      };
    case GET_HOSPITAL_FAIL:
      return {
        ...state,
        hospital: null,
      };
    default:
      return state;
  }
}
