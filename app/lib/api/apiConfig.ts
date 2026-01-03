import { ApiReponse } from "@/app/types/apiResponse";
import axiosInstance from "./axiosInstance";

export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/",
  timeout: 15000,
};

export const apiCall = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: Record<string, unknown> | FormData | null,
  params?: Record<string, unknown>,
  headers?: Record<string, string | undefined>
): Promise<ApiReponse<T>> => {
  try {
    const isFormData = data instanceof FormData;

    const response = await axiosInstance.request<ApiReponse<T>>({
      method,
      url,
      data: isFormData ? data: data,
      params,
      headers: isFormData ? undefined : headers,
    });
    return response.data;
  } catch (e) {
    throw new Error((e as Error).message || "Something went wrong");
  }
};
