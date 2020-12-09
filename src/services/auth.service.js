/** @format */

import axios from "axios";

const API_URL = "http://192.168.0.20:9900";

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
