/** @format */

import { GET_ANSWERS_SUCCESS, GET_ANSWERS_FAIL, SET_MESSAGE } from "./types";

import PersonService from "../services/person.service";

export const getAnswers = (idForm, idPerson) => (dispatch) => {
  return PersonService.getAnswersForm(idForm, idPerson).then(
    (data) => {
      dispatch({
        type: GET_ANSWERS_SUCCESS,
        payload: { answers: data.answers },
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
        type: GET_ANSWERS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
