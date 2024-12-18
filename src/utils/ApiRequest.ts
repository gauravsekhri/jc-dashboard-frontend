import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import {
  getCookies,
  setCookie,
  deleteCookie,
  getCookie,
} from "cookies-next/client";

type MethodType = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

const baseUrl: any = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const useApiRequest = () => {
  const router = useRouter();

  const request = async (
    path: string,
    method: MethodType,
    data?: any,
    params?: AxiosRequestConfig
  ) => {
    let response: any = {
      success: false,
      message: "SERVER_ERROR",
      data: null,
      headers: null,
    };

    const token = getCookie("auth");
    console.log(token);

    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + token;
    }

    axiosInstance.defaults.headers.common["accept"] = "application/json";

    try {
      const [apiResponse] = await Promise.all([
        axiosInstance(baseUrl + path, {
          data,
          method,
          ...params,
        }),
      ]);
      // axiosInstance.defaults.withCredentials = true;
      response = apiResponse.data;
      console.log("cookie", apiResponse.headers["set-cookie"]);
      response.headers = JSON.parse(JSON.stringify(apiResponse.headers));
    } catch (error: any) {
      if (error?.response) {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          router.push("/");
        } else if (error.response.status === 400) {
          response = error.response.data;
        } else if (error.response.status === 404) {
        } else if (error.response.status === 429) {
          response.message = "Too many requests. Please wait for some time.";
        } else {
        }
      }
    }
    return response;
  };

  return { request };
};

export default useApiRequest;
