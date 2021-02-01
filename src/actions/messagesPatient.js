/** @format */

import {
  GET_MESSAGES_PATIENT_SUCCESS,
  GET_MESSAGES_PATIENT_FAIL,
  SEND_MESSAGE_PATIENT_SUCCESS,
  SET_MESSAGE,
} from "./types";

import PersonService from "../services/person.service";

export const getMessages = (idPerson, idPatient) => (dispatch) => {
  return PersonService.getMessages(idPerson, idPatient).then(
    (data) => {
      console.log("getMessages actions : ", data.messages);
      dispatch({
        type: GET_MESSAGES_PATIENT_SUCCESS,
        payload: { messages: data.messages },
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
        type: GET_MESSAGES_PATIENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const sendMessage = (idPerson, idPatient, mensaje) => (dispatch) => {
  return PersonService.sendMessage(idPerson, idPatient, mensaje).then(
    (data) => {
      dispatch({
        type: SEND_MESSAGE_PATIENT_SUCCESS,
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
        type: GET_MESSAGES_PATIENT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
