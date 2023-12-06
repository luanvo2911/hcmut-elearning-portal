import axios from "axios";
// import { env } from "process";
// import dotenv from "dotenv";

// dotenv.config();

const BASE_URL: string | undefined =
  "https://hcmut-open-online-learning-portal-services.vercel.app/api/v1/query-selector";


const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
