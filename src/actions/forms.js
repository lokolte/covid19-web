/** @format */

import {
  GET_FORMS_SUCCESS,
  GET_FORMS_FAIL,
  GET_FORM_SUCCESS,
  GET_FORM_FAIL,
  SAVE_ITEM_SUCCESS,
  SAVE_ITEM_FAIL,
  SAVE_FORM_SUCCESS,
  SAVE_FORM_FAIL,
  SET_MESSAGE,
} from "./types";

import FormService from "../services/form.service";

export const getForms = () => (dispatch) => {
  return FormService.getPersonForms().then(
    (data) => {
      dispatch({
        type: GET_FORMS_SUCCESS,
        payload: { forms: data.forms },
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

export const getForm = (id) => (dispatch) => {
  return FormService.getForm(id).then(
    (data) => {
      dispatch({
        type: GET_FORM_SUCCESS,
        payload: { form: data.forms[0] },
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
        type: GET_FORM_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getFormsFromPatient = (personId) => (dispatch) => {
  return FormService.getFormsFromPatient(personId).then(
    (data) => {
      dispatch({
        type: GET_FORMS_SUCCESS,
        payload: { forms: data.forms },
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

export const create = (data) => (dispatch) => {
  return FormService.create(data).then(
    (data) => {
      dispatch({
        type: SAVE_FORM_SUCCESS,
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
        type: SAVE_FORM_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const saveItem = (data) => (dispatch) => {
  return FormService.saveItem(data).then(
    (data) => {
      dispatch({
        type: SAVE_ITEM_SUCCESS,
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
        type: SAVE_ITEM_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateItem = (id, data) => (dispatch) => {
  return FormService.saveItem(id, data).then(
    (data) => {
      dispatch({
        type: SAVE_ITEM_SUCCESS,
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
        type: SAVE_ITEM_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
