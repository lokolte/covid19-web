/** @format */

import {
  GET_FORMS_SUCCESS,
  GET_FORMS_FAIL,
  GET_FORM_SUCCESS,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FORMS_SUCCESS:
      return {
        ...state,
        forms: payload.forms,
      };
    case GET_FORMS_FAIL:
      return {
        ...state,
        forms: null,
      };
    default:
      return state;
  }
}
