/** @format */

import {
  GET_DOCTORS_SUCCESS,
  GET_DOCTORS_FAIL,
  GET_DOCTOR_SUCCESS,
  GET_DOCTOR_FAIL,
  SET_MESSAGE,
  SAVE_DOCTOR_SUCCESS,
  SAVE_DOCTOR_FAIL,
  ASSIGN_DOCTOR_SUCCESS,
} from "./types";

import service from "../services/person.service";
import doctorService from "../services/doctor.service";

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

export const getAllDoctors = () => (dispatch) => {
  return doctorService.getDoctors().then(
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

export const getDoctor = (id) => (dispatch) => {
  return doctorService.getDoctor(id).then(
    (data) => {
      dispatch({
        type: GET_DOCTOR_SUCCESS,
        payload: { doctor: data },
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
        type: GET_DOCTOR_FAIL,
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
  return doctorService.save(data).then(
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
