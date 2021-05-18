/** @format */

import { GET_ITEM_SUCCESS, GET_ITEM_FAIL } from "../actions/types";

export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEM_SUCCESS:
      return {
        ...state,
        item: payload.item,
      };
    case GET_ITEM_FAIL:
      return {
        ...state,
        item: null,
      };
    default:
      return state;
  }
}
