import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const parseJSON = (response: any) => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json ? response.json() : response;
};

const checkStatus = (response: AxiosResponse) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  error.status = response.status;
  throw error;
};

export default (url: string, options: AxiosRequestConfig) =>
  axios(url, options).then(checkStatus).then(parseJSON);
