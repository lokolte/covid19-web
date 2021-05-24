/** @format */

import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../config/env.config";

class FormService {
  getPersonForms(idPerson) {
    if (idPerson != null && idPerson != undefined) {
      return axios
        .get(API_URL + "/forms?idPerson=" + idPerson, { headers: authHeader() })
        .then((response) => {
          return response.data;
        });
    } else {
      return axios
        .get(API_URL + "/forms", { headers: authHeader() })
        .then((response) => {
          return response.data;
        });
    }
  }

  getForm(id) {
    return axios
      .get(API_URL + "/forms?idForm=" + id, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  create(data) {
    return axios
      .post(API_URL + "/forms/save", data, { headers: authHeader() })
      .then((response) => {
        return response;
      });
  }

  asignForms(id, data) {
    return axios
      .post(API_URL + "/forms/" + id, data, { headers: authHeader() })
      .then((response) => {
        return response;
      });
  }

  getQuestions(id) {
    return axios
      .get(API_URL + "/forms/" + id + "/questions", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  getFormsFromPatient(personId) {
    return axios
      .get(API_URL + "/forms/" + personId, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  getItems(idForm) {
    if (idForm == null || idForm == undefined) {
      return axios
        .get(API_URL + "/forms/items", { headers: authHeader() })
        .then((response) => {
          return response.data;
        });
    } else {
      return axios
        .get(API_URL + "/forms/items?idForm=" + idForm, {
          headers: authHeader(),
        })
        .then((response) => {
          return response.data;
        });
    }
  }

  getItem(id) {
    return axios
      .get(API_URL + "/forms/items/" + id, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  createItem(data) {
    return axios
      .post(API_URL + "/forms/items", data, { headers: authHeader() })
      .then((response) => {
        return response;
      });
  }

  saveItem(id, data) {
    return axios
      .put(API_URL + "/forms/items/" + id, data, { headers: authHeader() })
      .then((response) => {
        return response;
      });
  }
}

export default new FormService();
