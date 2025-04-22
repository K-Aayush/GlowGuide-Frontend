import apiClient from "../apiClient";
import { AIRecommendation } from "../../lib/types";

const aiService = {
  getRecommendations: async (): Promise<AIRecommendation> => {
    const { data } = await apiClient.get("/api/ai/recommendations");
    return {
      aiRecommendations: data.aiRecommendations,
      matchingProducts: data.matchingProducts,
    };
  },
};

export default aiService;
