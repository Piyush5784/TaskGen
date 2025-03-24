import axios from "axios";
const BACKEND_URL =
  process.env.Mode === "production"
    ? process.env.NEXTAUTH_URL_PRODUCTION
    : process.env.NEXTAUTH_URL;

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

export default axiosInstance;
