/** @format */

import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAIL, SET_MESSAGE } from "./types";

import service from "../services/form.service";

export const getQuestions = (id) => (dispatch) => {
  return service.getQuestions(id).then(
    (data) => {
      dispatch({
        type: GET_QUESTIONS_SUCCESS,
        payload: { questions: data },
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
        type: GET_QUESTIONS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
