import { getToken } from "./LoginService";
import config from '../config'
import axios from "axios";
import page from "page";

export function getAxios() {
  let instance = axios.create({
    baseURL: config.rootURL,
    headers: {
      "X-AUTH-TOKEN": getToken(),
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response === 'undefined') {
        console.log(error);
        return;
      }
      if (error.response.status === 401) {
        page.replace("/login");
        return;
      }
      return error;
    }
  );

  return instance;
}
