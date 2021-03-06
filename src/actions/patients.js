/** @format */

import {
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAIL,
  GET_PATIENT_SUCCESS,
  GET_PATIENT_FAIL,
  SET_MESSAGE,
} from "./types";

import PersonService from "../services/person.service";

export const getPatients = () => (dispatch) => {
  return PersonService.getPatients().then(
    (data) => {
      dispatch({
        type: GET_PATIENTS_SUCCESS,
        payload: { patients: data.persons },
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

export const getPatient = (id) => (dispatch) => {
  return PersonService.getPatient(id).then(
    (data) => {
      dispatch({
        type: GET_PATIENT_SUCCESS,
        payload: { patient: data },
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
        type: GET_PATIENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
