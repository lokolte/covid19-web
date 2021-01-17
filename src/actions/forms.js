/** @format */

import { GET_FORMS_SUCCESS, GET_FORMS_FAIL, SET_MESSAGE } from "./types";

import FormService from "../services/form.service";

export const getForms = () => (dispatch) => {
  return FormService.getPersonForms().then(
    (data) => {
      dispatch({
        type: GET_FORMS_SUCCESS,
        payload: { forms: data.forms },
      });

      console.log("se trajo algo?", data);

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
        type: GET_FORMS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
