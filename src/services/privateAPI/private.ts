import { AxiosError } from "axios";
import { apiClient } from "../apiClient";

export const RemainingLeave = async () => {
  try {
    const response = await apiClient.get("/api/v1/leave-balance", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error("Fetching During Leave:" + error.message);
    } else {
      throw new Error("Fetching During Leave: Unknown error");
    }
  }
};

export const LeaveApplications = async () => {
  try {
    const response = await apiClient.get("/api/v1/view-leaveApplications", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error("Fetching During Leave Applications:" + error.message);
    } else {
      throw new Error("Fetching During Leave Applications: Unknown error");
    }
  }
};
