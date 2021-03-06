/** @format */

import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../config/env.config";

class RoleService {
  get(accountId) {
    if (accountId != null && accountId != undefined) {
      return axios
        .get(API_URL + "/roles?accountId=" + accountId, {
          headers: authHeader(),
        })
        .then((response) => {
          return response.data;
        });
    } else {
      return axios
        .get(API_URL + "/roles", { headers: authHeader() })
        .then((response) => {
          return response.data;
        });
    }
  }
}

export default new RoleService();
