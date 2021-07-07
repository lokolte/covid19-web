/** @format */

import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../config/env.config";

class ProvinceService {
  getProvinces(idPerson) {
    let url = API_URL + "/provinces";
    if (idPerson != null && idPerson != undefined)
      url = API_URL + "/provinces?idPerson=" + idPerson;
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  getDistricts(id) {
    return axios
      .get(API_URL + "/provinces/" + id + "/districts", {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new ProvinceService();
