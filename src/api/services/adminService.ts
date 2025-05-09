import apiClient from "../apiClient";
import { AdminStats, UserData } from "../../lib/types";

const adminService = {
  getStats: async (): Promise<AdminStats> => {
    const { data } = await apiClient.get("/api/admin/stats");
    return data.stats;
  },

  getAllUsers: async (): Promise<UserData[]> => {
    const { data } = await apiClient.get("/api/admin/users");
    return data.users;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/admin/users/${id}`);
  },

  updateUserRole: async (id: string, role: string): Promise<UserData> => {
    const { data } = await apiClient.patch(`/api/admin/users/${id}/role`, {
      role,
    });
    return data.user;
  },
};

export default adminService;
