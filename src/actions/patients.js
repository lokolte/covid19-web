/** @format */

import { GET_PATIENTS_SUCCESS, GET_PATIENTS_FAIL, SET_MESSAGE } from "./types";

import PersonService from "../services/person.service";

export const getPatients = () => (dispatch) => {
  return PersonService.getPatients().then(
    (data) => {
      dispatch({
        type: GET_PATIENTS_SUCCESS,
        payload: { patients: data.persons },
      });

      console.log("se trajo algo?", data);

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
        type: GET_PATIENTS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
