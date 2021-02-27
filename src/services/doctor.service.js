/** @format */

import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../config/env.config";

class DoctorService {
  getDoctors() {
    return axios
      .get(API_URL + "/accounts/doctors", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  importarDatos(formData) {
    return axios.post(API_URL + "/accounts/doctors/import", formData, {
      headers: authHeader(),
    });
  }
}

export default new DoctorService();
