/** @format */

import {
  GET_DOCTORS_SUCCESS,
  GET_DOCTORS_FAIL,
  SET_MESSAGE,
  ASSIGN_DOCTOR_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from "./types";

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

export const saveAssignment = (idPerson, idDoctor) => (dispatch) => {
  return service.saveAssignment(idPerson, idDoctor).then(
    (data) => {
      dispatch({
        type: ASSIGN_DOCTOR_SUCCESS,
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

export const changePassword = (data) => (dispatch) => {
  return service.changePassword(data).then(
    (data) => {
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
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
        type: CHANGE_PASSWORD_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
