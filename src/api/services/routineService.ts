import apiClient from "../apiClient";
import { RoutineData } from "../../lib/types";

interface CreateRoutinePayload {
  name: string;
  type: string;
}

interface AddRoutineStepPayload {
  routineId: string;
  productId: string;
  stepOrder: number;
  notes?: string;
}

const routineService = {
  getRoutines: async (): Promise<RoutineData[]> => {
    const { data } = await apiClient.get("/api/routines");
    return data;
  },

  getRoutineById: async (id: string): Promise<RoutineData> => {
    const { data } = await apiClient.get(`/api/routines/${id}`);
    return data;
  },

  createRoutine: async (
    payload: CreateRoutinePayload
  ): Promise<RoutineData> => {
    const { data } = await apiClient.post("/api/routines", payload);
    return data;
  },

  updateRoutine: async (
    id: string,
    payload: Partial<CreateRoutinePayload>
  ): Promise<RoutineData> => {
    const { data } = await apiClient.put(`/api/routines/${id}`, payload);
    return data;
  },

  deleteRoutine: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/routines/${id}`);
  },

  addRoutineStep: async (
    payload: AddRoutineStepPayload
  ): Promise<RoutineData> => {
    const { data } = await apiClient.post("/api/routines/steps", payload);
    return data;
  },

  deleteRoutineStep: async (stepId: string): Promise<void> => {
    await apiClient.delete(`/api/routines/steps/${stepId}`);
  },
};

export default routineService;
