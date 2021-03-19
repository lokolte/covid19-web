/** @format */

import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../config/env.config";

class CoordinatorService {
  getCoordinators() {
    return axios
      .get(API_URL + "/coordinators", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  save(data) {
    return axios.post(API_URL + "/coordinators", data, {
      headers: authHeader(),
    });
  }
}

export default new CoordinatorService();
