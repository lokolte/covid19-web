/** @format */

import { GET_ROLES_SUCCESS, GET_ROLES_FAIL } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: payload.roles,
      };
    case GET_ROLES_FAIL:
      return {
        ...state,
        roles: null,
      };
    default:
      return state;
  }
}
