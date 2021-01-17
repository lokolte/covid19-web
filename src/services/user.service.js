/** @format */

import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../config/env.config";

class UserService {
  getPersons() {
    return axios
      .get(API_URL + "/persons", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  getPersonAnswers() {
    return axios
      .get(API_URL + "/answers", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  getPersonForms() {
    return axios
      .get(API_URL + "/forms", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new UserService();
