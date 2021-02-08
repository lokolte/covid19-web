/** @format */

import { GET_HOSPITALS_SUCCESS, GET_HOSPITALS_FAIL } from "../actions/types";

export default function (state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case GET_HOSPITALS_SUCCESS:
      return {
        ...state,
        hospitals: payload.hospitals,
      };
    case GET_HOSPITALS_FAIL:
      return {
        ...state,
        hospitals: null,
      };
    default:
      return state;
  }
}
