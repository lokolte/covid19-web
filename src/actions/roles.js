/** @format */

import { GET_ROLES_SUCCESS, GET_ROLES_FAIL, SET_MESSAGE } from "./types";

import service from "../services/role.service";

export const getRoles = (accountId) => (dispatch) => {
  return service.get(accountId).then(
    (data) => {
      dispatch({
        type: GET_ROLES_SUCCESS,
        payload: { roles: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_ROLES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
