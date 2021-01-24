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
}

export default new FormService();
