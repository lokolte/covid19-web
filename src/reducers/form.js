/** @format */

import { GET_FORM_SUCCESS, GET_FORM_FAIL } from "../actions/types";

export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FORM_SUCCESS:
      return {
        ...state,
        form: payload.form,
      };
    case GET_FORM_FAIL:
      return {
        ...state,
        form: null,
      };
    default:
      return state;
  }
}
