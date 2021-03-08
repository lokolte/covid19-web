/** @format */

import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../config/env.config";

class HospitalService {
  getHospitals(idDoctor) {
    if (idDoctor !== null && idDoctor !== undefined) {
      return axios
        .get(API_URL + "/hospitals?idDoctor=" + idDoctor, {
          headers: authHeader(),
        })
        .then((response) => {
          return response.data;
        });
    } else {
      return axios
        .get(API_URL + "/hospitals", { headers: authHeader() })
        .then((response) => {
          return response.data;
        });
    }
  }

  getHospitalsDoctor(id) {
    return axios
      .get(API_URL + "/accounts/doctors/" + id + "/hospitals", {
        headers: authHeader(),
      })
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
