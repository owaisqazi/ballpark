import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: "https://consultify.dev-bt.xyz/api/",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("Token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const Data = error?.response?.data;
    const errors = Data.error;
    if (errors) {
      errors.map((e) => toast.error(e));
    } else {
      if (
        Data.message === "Unauthenticated." ||
        Data.message.includes("No query results for model")
      ) {
      } else {
        toast.error(Data.message);
      }
      if (Data.message.includes("No query results for model")) {
      } else {
        console.log(
          Data.message.includes("No query results for model"),
          Data.message,
          '<====!Data.message.includes("No query results for model")'
        );
      }
    }
    if (Data.message === "Unauthenticated.") {
      localStorage.clear();
      // window.location.pathname = "/login";

      localStorage.setItem("Unauthenticated", true);
    } else {
      localStorage.setItem("Unauthenticated", false);
    }
    return Promise.reject(error);
  }
);
