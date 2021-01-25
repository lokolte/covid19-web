/** @format */

import {
  GET_ANSWERS_SUCCESS,
  GET_ANSWER_SUCCESS,
  GET_ANSWERS_FAIL,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ANSWERS_SUCCESS:
      return {
        ...state,
        answers: payload.answers,
      };
    case GET_ANSWERS_FAIL:
      return {
        ...state,
        answers: null,
      };
    default:
      return state;
  }
}
