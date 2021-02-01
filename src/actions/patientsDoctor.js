/** @format */

import {
  GET_PATIENTS_DOCTOR_SUCCESS,
  GET_PATIENTS_DOCTOR_FAIL,
  SET_MESSAGE,
} from "./types";

import PersonService from "../services/person.service";

export const getPatients = (id) => (dispatch) => {
  return PersonService.getPatientsFromDoctor(id).then(
    (data) => {
      dispatch({
        type: GET_PATIENTS_DOCTOR_SUCCESS,
        payload: { patientsDoctor: data.patients },
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
        type: GET_PATIENTS_DOCTOR_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
