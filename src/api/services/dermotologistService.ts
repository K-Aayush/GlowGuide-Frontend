import apiClient from "../apiClient";
import {
  DermatologistStats,
  Patient,
  DermatologistActivity,
} from "../../lib/types";

const dermotologistService = {
  getPatients: async (): Promise<Patient[]> => {
    const { data } = await apiClient.get("/api/dermotologist/patients");
    return data.patients;
  },

  getPatientDetails: async (id: string): Promise<Patient> => {
    const { data } = await apiClient.get(`/api/dermotologist/patients/${id}`);
    return data.patient;
  },

  getStats: async (): Promise<DermatologistStats> => {
    const { data } = await apiClient.get("/api/dermotologist/stats");
    return data.stats;
  },

  getRecentActivity: async (): Promise<DermatologistActivity[]> => {
    const { data } = await apiClient.get("/api/dermotologist/activity");
    return data.activities;
  },
};

export default dermotologistService;
