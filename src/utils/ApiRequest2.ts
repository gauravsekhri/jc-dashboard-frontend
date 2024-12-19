import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "./cookieActions";
// import {
//   getCookies,
//   setCookie,
//   deleteCookie,
//   getCookie,
// } from "cookies-next/client";

type MethodType = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
const baseUrl: any = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface IApiResponse {
  success: Boolean;
  message: String;
  data: any;
}

const request = async (
  path: string,
  method: MethodType,
  data?: any,
  params?: AxiosRequestConfig
) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  axiosInstance.defaults.headers.common["accept"] = "application/json";

  const token = await getCookie("auth");
  console.log("cookie token", token);
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  let response: IApiResponse = {
    success: false,
    message: "SERVER_ERROR",
    data: null,
  };

  try {
    const [apiResponse] = await Promise.all([
      axiosInstance(baseUrl + path, {
        data,
        method,
        ...params,
      }),
    ]);
    console.log(apiResponse);
    response = apiResponse.data;
  } catch (error: any) {
    console.log(error);
    if (error?.response) {
      if (error.response.status === 429) {
        response.message = "Too many requests. Please wait for some time.";
      }
    }
  }
  return response;
};

export default request;
