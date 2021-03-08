/** @format */

import {
  GET_HOSPITALS_DOCTOR_SUCCESS,
  GET_HOSPITALS_DOCTOR_FAIL,
} from "../actions/types";

export default function (state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case GET_HOSPITALS_DOCTOR_SUCCESS:
      return {
        ...state,
        asignados: payload.asignados,
      };
    case GET_HOSPITALS_DOCTOR_FAIL:
      return {
        ...state,
        asignados: null,
      };
    default:
      return state;
  }
}
