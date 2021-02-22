/** @format */

import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../config/env.config";

class HospitalService {
  getHospitals() {
    return axios
      .get(API_URL + "/hospitals", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  importarDatos(formData) {
    return axios.post(API_URL + "/hospitals/cargar", formData, {
      headers: authHeader(),
    });
  }
}

export default new HospitalService();
