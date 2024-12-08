import { UserLogin } from "@/app/(pages)/(public)/login/page";
import { apiClient } from "./apiClient";
import { RegisterUser } from "@/app/(pages)/(public)/signup/page";
import { AxiosError } from "axios";

export const registerUser = async (data: RegisterUser) => {
  try {
    const response = await apiClient.post("/auth/signup", data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error("Registration failed: " + error.message);
    } else {
      throw new Error("Registration failed: Unknown error");
    }
  }
};

export const loginUser = async (data: UserLogin) => {
  try {
    const response = await apiClient.post("/auth/login", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error("Login Failed" + error.message);
    } else {
      throw new Error("Login Failed : Unknown Error");
    }
  }
};
