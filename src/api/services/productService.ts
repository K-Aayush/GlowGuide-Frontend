import apiClient from "../apiClient";
import { ProductData } from "../../lib/types";

interface ProductQueryParams {
  skinType?: string;
  concerns?: string[];
  page?: number;
  limit?: number;
}

const productService = {
  getProducts: async (
    params: ProductQueryParams = {}
  ): Promise<ProductData[]> => {
    const { data } = await apiClient.get("/api/products", { params });
    return data;
  },

  getProductById: async (id: string): Promise<ProductData> => {
    const { data } = await apiClient.get(`/api/products/${id}`);
    return data;
  },

  getRecommendedProducts: async (): Promise<ProductData[]> => {
    const { data } = await apiClient.get("/api/products/recommended");
    return data;
  },
};

export default productService;
