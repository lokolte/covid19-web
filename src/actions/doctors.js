/** @format */

import { GET_DOCTORS_SUCCESS, GET_DOCTORS_FAIL, SET_MESSAGE } from "./types";

import service from "../services/person.service";

export const getDoctors = (idPerson) => (dispatch) => {
  return service.getDoctors(idPerson).then(
    (data) => {
      dispatch({
        type: GET_DOCTORS_SUCCESS,
        payload: { doctors: data },
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
        type: GET_DOCTORS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
