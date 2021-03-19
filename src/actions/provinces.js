/** @format */

import {
  GET_PROVINCES_SUCCESS,
  GET_PROVINCES_FAIL,
  SET_MESSAGE,
} from "./types";

import service from "../services/provinces.service";

export const getProvinces = () => (dispatch) => {
  return service.getProvinces().then(
    (data) => {
      dispatch({
        type: GET_PROVINCES_SUCCESS,
        payload: { provinces: data },
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
        type: GET_PROVINCES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
