import apiClient from "../apiClient";
import { AuthResponse } from "../../lib/types";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      "/api/auth/login",
      payload
    );
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
    }
    return data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      "/api/auth/register",
      payload
    );
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  },
};

export default authService;
