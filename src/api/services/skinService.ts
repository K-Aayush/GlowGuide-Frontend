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
    // Transform the data to match backend expectations
    const payload = {
      skinType: [profileData.skinType],
      concerns: profileData.concerns,
      allergies: profileData.allergies || "",
      goals: profileData.goals,
    };

    const { data } = await apiClient.post("/api/skinProfile", payload);
    return data.profile;
  },

  updateSkinProfile: async (
    profileData: Partial<SkinAssessmentFormData>
  ): Promise<SkinProfileData> => {
    // Transform the data to match backend expectations
    const payload = {
      skinType: profileData.skinType ? [profileData.skinType] : undefined,
      concerns: profileData.concerns,
      allergies: profileData.allergies,
      goals: profileData.goals,
    };

    const { data } = await apiClient.put("/api/skinProfile", payload);
    return data.profile;
  },
};

export default skinProfileService;
