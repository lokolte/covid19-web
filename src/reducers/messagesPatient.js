/** @format */

import {
  GET_MESSAGES_PATIENT_SUCCESS,
  GET_MESSAGES_PATIENT_FAIL,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MESSAGES_PATIENT_SUCCESS:
      return {
        ...state,
        messagesPatient: payload.patients,
      };
    case GET_MESSAGES_PATIENT_FAIL:
      return {
        ...state,
        messagesPatient: null,
      };
    default:
      return state;
  }
}
