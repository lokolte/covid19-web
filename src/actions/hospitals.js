/** @format */

import {
  GET_HOSPITALS_SUCCESS,
  GET_HOSPITALS_FAIL,
  GET_HOSPITAL_SUCCESS,
  GET_HOSPITAL_FAIL,
  SAVE_HOSPITAL_SUCCESS,
  SAVE_HOSPITAL_FAIL,
  SET_MESSAGE,
} from "./types";

import HospitalService from "../services/hospitals.service";

export const getHospitals = (idDoctor) => (dispatch) => {
  return HospitalService.getHospitals(idDoctor).then(
    (data) => {
      dispatch({
        type: GET_HOSPITALS_SUCCESS,
        payload: { hospitals: data },
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
        type: GET_HOSPITALS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getHospital = (id) => (dispatch) => {
  return HospitalService.getHospital(id).then(
    (data) => {
      dispatch({
        type: GET_HOSPITAL_SUCCESS,
        payload: { hospital: data },
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
        type: GET_HOSPITAL_FAIL,
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
  return HospitalService.save(data).then(
    (data) => {
      dispatch({
        type: SAVE_HOSPITAL_SUCCESS,
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
        type: SAVE_HOSPITAL_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
