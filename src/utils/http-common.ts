import axios from "axios";

const BASE_URL: string | undefined = import.meta.env.VITE_API_BASE_URL;
const BASE_URL_CREATE: string | undefined = import.meta.env.VITE_API_BASE_URL_CREATE;
const BASE_URL_DELETE: string | undefined = import.meta.env.VITE_API_BASE_URL_DELETE;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

const instance_create = axios.create({
  baseURL: BASE_URL_CREATE,
  headers: {
    "Content-Type": "application/json",
  },
});

const instance_delete = axios.create({
  baseURL: BASE_URL_DELETE,
  headers: {
    "Content-Type": "application/json",
  }
})

export { instance, instance_create, instance_delete };
