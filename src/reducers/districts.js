/** @format */

import { GET_DISTRICTS_SUCCESS, GET_DISTRICTS_FAIL } from "../actions/types";

export default function (state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DISTRICTS_SUCCESS:
      return {
        ...state,
        districts: payload.districts,
      };
    case GET_DISTRICTS_FAIL:
      return {
        ...state,
        districts: null,
      };
    default:
      return state;
  }
}
