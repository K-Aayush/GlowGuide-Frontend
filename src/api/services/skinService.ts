import apiClient from "../apiClient";
import { SkinProfileData, SkinAssessmentFormData } from "../../lib/types";

const skinProfileService = {
  getSkinProfile: async (): Promise<SkinProfileData> => {
    const { data } = await apiClient.get("/api/skinProfile");
    return data.profile;
  },

  createSkinProfile: async (
    profileData: SkinAssessmentFormData
  ): Promise<SkinProfileData> => {
    const { data } = await apiClient.post("/api/skinProfile", profileData);
    return data.profile;
  },

  updateSkinProfile: async (
    profileData: Partial<SkinAssessmentFormData>
  ): Promise<SkinProfileData> => {
    const { data } = await apiClient.put("/api/skinProfile", profileData);
    return data.profile;
  },
};

export default skinProfileService;
