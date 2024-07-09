import axios, { InternalAxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export function setBearerToken(
  token: string,
  config?: InternalAxiosRequestConfig
) {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  if (!config) return;
  config.headers.Authorization = `Bearer ${token}`;
}

export function clearBearerToken(config?: InternalAxiosRequestConfig) {
  client.defaults.headers.common.Authorization = undefined;
  if (!config) return;
  config.headers.Authorization = undefined;
}

export default client;
