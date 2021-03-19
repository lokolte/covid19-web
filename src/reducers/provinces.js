/** @format */

import { GET_PROVINCES_SUCCESS, GET_PROVINCES_FAIL } from "../actions/types";

export default function (state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROVINCES_SUCCESS:
      return {
        ...state,
        provinces: payload.provinces,
      };
    case GET_PROVINCES_FAIL:
      return {
        ...state,
        provinces: null,
      };
    default:
      return state;
  }
}
