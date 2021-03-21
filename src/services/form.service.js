/** @format */

import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../config/env.config";

class FormService {
  getPersonForms() {
    return axios
      .get(API_URL + "/forms", { headers: authHeader() })
      .then((response) => {
        return response.data;
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
}

export default new FormService();
