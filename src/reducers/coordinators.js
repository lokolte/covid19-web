/** @format */

import { GET_COORDINATORS_SUCCESS, GET_COORDINATORS_FAIL } from "../actions/types";

export default function (state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COORDINATORS_SUCCESS:
      return {
        ...state,
        coordinators: payload.coordinators,
      };
    case GET_COORDINATORS_FAIL:
      return {
        ...state,
        coordinators: null,
      };
    default:
      return state;
  }
}
