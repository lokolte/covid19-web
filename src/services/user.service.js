/** @format */

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9900";

class UserService {
  getPersons() {
    return axios.get(API_URL + "/persons", { headers: authHeader() });
  }

  getPersonAnswers() {
    return axios.get(API_URL + "/answers", { headers: authHeader() });
  }

  getPersonForms() {
    return axios.get(API_URL + "/forms", { headers: authHeader() });
  }
}

export default new UserService();
