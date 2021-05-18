/** @format */

import { GET_ITEMS_SUCCESS, GET_ITEMS_FAIL } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: payload.items,
      };
    case GET_ITEMS_FAIL:
      return {
        ...state,
        items: null,
      };
    default:
      return state;
  }
}
