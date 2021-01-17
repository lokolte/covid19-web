/** @format */

import axios from "axios";
import { API_URL } from "../config/env.config";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/authentication/authenticate", { email, password })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
