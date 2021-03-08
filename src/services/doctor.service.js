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
  getDoctor(id) {
    return axios
      .get(API_URL + "/accounts/doctors/" + id, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  save(data) {
    return axios.post(API_URL + "/accounts/doctors", data, {
      headers: authHeader(),
    });
  }
  saveHospitals(id, data) {
    return axios.post(
      API_URL + "/accounts/doctors/" + id + "/hospitals",
      data,
      {
        headers: authHeader(),
      }
    );
  }
  importarDatos(formData) {
    return axios.post(API_URL + "/accounts/doctors/import", formData, {
      headers: authHeader(),
    });
  }
  download(id) {
    return axios
      .get(API_URL + "/accounts/doctors/export", { headers: authHeader() })
      .then((response) => {
        return response;
      });
  }
}

export default new DoctorService();
