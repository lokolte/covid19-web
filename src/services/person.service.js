/** @format */

import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../config/env.config";

class PersonService {
  getPersons() {
    return axios
      .get(API_URL + "/persons", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  getPatients() {
    return axios
      .get(API_URL + "/persons/patients", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  getAnswersForm(idForm, idPerson) {
    return axios
      .get(API_URL + "/persons/" + idPerson + "/forms/" + idForm + "/answers", {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new PersonService();
