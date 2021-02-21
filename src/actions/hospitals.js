/** @format */

import {
  GET_HOSPITALS_SUCCESS,
  GET_HOSPITALS_FAIL,
  SET_MESSAGE,
} from "./types";

import HospitalService from "../services/hospitals.service";

export const getHospitals = () => (dispatch) => {
  return HospitalService.getHospitals().then(
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
