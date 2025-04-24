import apiClient from "../apiClient";
import { SkinProfileData } from "../../lib/types";

const skinProfileService = {
  getSkinProfile: async (): Promise<SkinProfileData> => {
    const { data } = await apiClient.get("/api/skinProfile");
    return data.profile;
  },

  createSkinProfile: async (profileData: any): Promise<SkinProfileData> => {
    // Format the data to match the API's expected structure
    const payload = {
      skinType: [{ type: profileData.skinType }],
      concerns: profileData.concerns.map((concern: string) => ({
        concern: concern,
      })),
      allergies: profileData.allergies || "",
      goals: profileData.goals,
    };

    const { data } = await apiClient.post("/api/skinProfile", payload);
    return data.profile;
  },

  updateSkinProfile: async (profileData: any): Promise<SkinProfileData> => {
    // Format the data to match the API's expected structure
    const payload = {
      skinType: [{ type: profileData.skinType }],
      concerns: profileData.concerns.map((concern: string) => ({
        concern: concern,
      })),
      allergies: profileData.allergies || "",
      goals: profileData.goals,
    };

    const { data } = await apiClient.put("/api/skinProfile", payload);
    return data.profile;
  },
};

export default skinProfileService;
