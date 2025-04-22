import apiClient from "../apiClient";
import { NotificationData } from "../../lib/types";

const notificationService = {
  getNotifications: async (): Promise<NotificationData[]> => {
    const { data } = await apiClient.get("/api/notifications");
    return data.notifications;
  },

  markAsRead: async (id: string): Promise<void> => {
    await apiClient.patch(`/api/notifications/${id}/read`);
  },

  markAllAsRead: async (): Promise<void> => {
    await apiClient.patch("/api/notifications/read-all");
  },

  deleteNotification: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/notifications/${id}`);
  },
};

export default notificationService;
