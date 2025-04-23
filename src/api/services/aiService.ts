import apiClient from "../apiClient";
import { AIRecommendation } from "../../lib/types";

const aiService = {
  getRecommendations: async (): Promise<AIRecommendation> => {
    try {
      const { data } = await apiClient.get("/api/ai/recommendations");
      return {
        aiRecommendations: data.recommendations || "",
        matchingProducts: data.products || [],
      };
    } catch (error) {
      console.error("AI recommendations error:", error);
      throw error;
    }
  },
};

export default aiService;
