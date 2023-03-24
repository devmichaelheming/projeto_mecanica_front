import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 36000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
