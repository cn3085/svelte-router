import { getToken } from "./LoginService";
import axios from "axios";
import page from "page";

export function getAxios() {
  let instance = axios.create({
    baseURL: "http://localhost:8088",
    headers: {
      "X-AUTH-TOKEN": getToken(),
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        page.replace("/login");
        return;
      }
      return error;
    }
  );

  return instance;
}
