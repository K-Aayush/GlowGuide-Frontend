import apiClient from "../apiClient";
import {
  UserData,
  SkinProfileData,
  RoutineData,
  ProgressLogData,
} from "../../lib/types";

export interface DermatologistStats {
  totalPatients: number;
  newPatientsThisMonth: number;
  pendingAssessments: number;
  totalRoutines: number;
}

export interface Activity {
  type: "routine_created" | "assessment_completed" | "progress_update";
  date: Date;
  patient: string;
  details: string;
}

export interface Patient extends UserData {
  skinProfile: SkinProfileData;
  progressLogs: ProgressLogData[];
  routines?: RoutineData[];
}

const dermatologistService = {
  getPatients: async (): Promise<Patient[]> => {
    const { data } = await apiClient.get<{
      success: boolean;
      patients: Patient[];
    }>("/api/dermatologist/patients");
    return data.patients;
  },

  getPatientDetails: async (id: string): Promise<Patient> => {
    const { data } = await apiClient.get<{
      success: boolean;
      patient: Patient;
    }>(`/api/dermatologist/patients/${id}`);
    return data.patient;
  },

  getStats: async (): Promise<DermatologistStats> => {
    const { data } = await apiClient.get<{
      success: boolean;
      stats: DermatologistStats;
    }>("/api/dermatologist/stats");
    return data.stats;
  },

  getRecentActivity: async (): Promise<Activity[]> => {
    const { data } = await apiClient.get<{
      success: boolean;
      activities: Activity[];
    }>("/api/dermatologist/activity");
    return data.activities;
  },
};

export default dermatologistService;
