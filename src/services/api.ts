import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL + "/data/2.5";
const baseGeoURL = import.meta.env.VITE_APP_API_URL;

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const axiosGeoClient = axios.create({
  baseURL: baseGeoURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosClient;
