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

  getDoctors(idPerson) {
    return axios
      .get(API_URL + "/persons/" + idPerson + "/doctors", {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  getPatientsFromDoctor(id) {
    return axios
      .get(API_URL + "/persons/" + id + "/patients", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  sendMessage(id, idPatient, message) {
    return axios
      .post(
        API_URL + "/persons/" + id + "/patients/" + idPatient + "/messages",
        { messageText: message },
        { headers: authHeader() }
      )
      .then((response) => {
        return response;
      });
  }

  getMessages(idPerson, idPatient) {
    return axios
      .get(
        API_URL +
          "/persons/" +
          idPerson +
          "/patients/" +
          idPatient +
          "/messages",
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        return response.data;
      });
  }

  saveAssignment(patient, doctor) {
    return axios
      .post(
        API_URL + "/persons/" + patient + "/doctors/" + doctor,
        {},
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        return response.data;
      });
  }
}

export default new PersonService();
