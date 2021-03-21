/** @format */

import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAIL } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: payload.questions,
      };
    case GET_QUESTIONS_FAIL:
      return {
        ...state,
        questions: null,
      };
    default:
      return state;
  }
}
