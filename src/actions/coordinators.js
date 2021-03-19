/** @format */

import {
  GET_COORDINATORS_SUCCESS,
  GET_COORDINATORS_FAIL,
  SAVE_DOCTOR_SUCCESS,
  SAVE_DOCTOR_FAIL,
  SET_MESSAGE,
} from "./types";

import service from "../services/coordinator.service";

export const getCoordinators = () => (dispatch) => {
  return service.getCoordinators().then(
    (data) => {
      dispatch({
        type: GET_COORDINATORS_SUCCESS,
        payload: { coordinators: data },
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
        type: GET_COORDINATORS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const save = (data) => (dispatch) => {
  return service.save(data).then(
    (data) => {
      dispatch({
        type: SAVE_DOCTOR_SUCCESS,
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
        type: SAVE_DOCTOR_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
