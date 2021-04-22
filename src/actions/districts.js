/** @format */

import {
  GET_DISTRICTS_SUCCESS,
  GET_DISTRICTS_FAIL,
  SET_MESSAGE,
} from "./types";

import ProvinceService from "../services/provinces.service";

export const getDistricts = (id) => (dispatch) => {
  return ProvinceService.getDistricts(id).then(
    (data) => {
      dispatch({
        type: GET_DISTRICTS_SUCCESS,
        payload: { districts: data },
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
        type: GET_DISTRICTS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};