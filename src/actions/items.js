/** @format */

import {
  GET_ITEMS_SUCCESS,
  GET_ITEM_SUCCESS,
  GET_ITEMS_FAIL,
  GET_ITEM_FAIL,
  SET_MESSAGE,
} from "./types";

import FormService from "../services/form.service";

export const getItems = (idForm) => (dispatch) => {
  return FormService.getItems(idForm).then(
    (data) => {
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: { items: data },
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
        type: GET_ITEMS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getItem = (id) => (dispatch) => {
  return FormService.getItem(id).then(
    (data) => {
      dispatch({
        type: GET_ITEM_SUCCESS,
        payload: { item: data },
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
        type: GET_ITEM_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
