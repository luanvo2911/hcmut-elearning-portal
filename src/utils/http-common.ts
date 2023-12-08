import axios from "axios";

const BASE_URL: string | undefined = import.meta.env.VITE_API_BASE_URL


const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
