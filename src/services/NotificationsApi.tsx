import {NotificationPayload} from "../interfaces/NotificationPayload";
import { NotificationsService } from "../interfaces/NotificationsService";

class NotificationsApi implements NotificationsService {
    private baseUrl: string;
  
    constructor(orgId: number) {
      this.baseUrl = `/api/anomaly-service/${orgId}`;
    }
  
    private async fetchAndParse<T>(url: string, options?: RequestInit): Promise<T> {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data;
    }
  
    async getAllRecords(): Promise<NotificationPayload[]> {
      const url = this.baseUrl;
      return this.fetchAndParse<NotificationPayload[]>(url);
    }
  
    async getUnreadRecords(): Promise<NotificationPayload[]> {
      const url = `${this.baseUrl}/unread`;
      return this.fetchAndParse<NotificationPayload[]>(url);
    }
  
    async markAllAsRead(): Promise<void> {
      const url = `${this.baseUrl}/mark-read`;
      await fetch(url, { method: "POST" });
    }
  
    async markRecordsAsRead(recordIds: number | number[]): Promise<void> {
      let queryString: string;
      if (Array.isArray(recordIds))
        queryString = recordIds.join(",");
      else
        queryString = recordIds.toString();
      const url = `${this.baseUrl}/mark-read?messageId=${queryString}`;
      await fetch(url, { method: "POST" });
    }
}
  
export default NotificationsApi;
