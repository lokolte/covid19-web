/** @format */

import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../config/env.config";

class ProvinceService {

  getProvinces(id) {
    return axios
      .get(API_URL + "/provinces", {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new ProvinceService();
