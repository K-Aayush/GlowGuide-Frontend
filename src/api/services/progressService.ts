import apiClient from "../apiClient";
import { ProgressLogData, ProgressComparisonData } from "../../lib/types";

interface CreateProgressLogPayload {
  imageUrl?: string;
  notes?: string;
  concerns: string;
  rating: number;
}

const progressService = {
  getLogs: async (): Promise<ProgressLogData[]> => {
    const { data } = await apiClient.get("/api/progress");
    return data.logs;
  },

  createLog: async (
    payload: CreateProgressLogPayload
  ): Promise<ProgressLogData> => {
    const { data } = await apiClient.post("/api/progress", payload);
    return data.log;
  },

  deleteLog: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/progress/${id}`);
  },

  getComparison: async (
    fromDate: string,
    toDate: string
  ): Promise<ProgressComparisonData> => {
    const { data } = await apiClient.get("/api/progress/comparison", {
      params: { fromDate, toDate },
    });
    return data;
  },
};

export default progressService;
