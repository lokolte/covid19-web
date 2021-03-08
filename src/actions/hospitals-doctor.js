/** @format */

import {
  GET_HOSPITALS_DOCTOR_SUCCESS,
  GET_HOSPITALS_DOCTOR_FAIL,
  SET_MESSAGE,
} from "./types";

import HospitalService from "../services/hospitals.service";

export const getHospitalsDoctor = (id) => (dispatch) => {
  return HospitalService.getHospitalsDoctor(id).then(
    (data) => {
      dispatch({
        type: GET_HOSPITALS_DOCTOR_SUCCESS,
        payload: { asignados: data },
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
        type: GET_HOSPITALS_DOCTOR_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
