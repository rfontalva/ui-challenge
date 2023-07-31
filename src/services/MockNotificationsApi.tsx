import {NotificationPayload} from "../interfaces/NotificationPayload";
import { NotificationsService } from "../interfaces/NotificationsService";

class MockNotificationsApi implements NotificationsService {
    public notifications: NotificationPayload[];
  
    constructor() {
        this.notifications = [
          {
            "id": 1,
            "title": "Critical Issue Detected",
            "timestamp": "Today, 9:45 AM",
            "description": "An asset has encountered a critical issue and requires immediate attention.",
            "criticality": "high",
            "read": false
          },
          {
            "id": 2,
            "title": "Disk Space Full",
            "timestamp": "Today, 10:15 AM",
            "description": "The disk space of an asset is almost full. Consider freeing up space.",
            "criticality": "medium",
            "read": true
          },
          {
            "id": 3,
            "title": "System Update Available",
            "timestamp": "Today, 11:30 AM",
            "description": "A new system update is available for installation on one or more assets.",
            "criticality": "low",
            "read": false
          },
          {
            "id": 4,
            "title": "Network Connectivity Issue",
            "timestamp": "Today, 1:00 PM",
            "description": "An asset is experiencing network connectivity issues. Investigate the problem.",
            "criticality": "medium",
            "read": true
          },
          {
            "id": 5,
            "title": "Performance Degradation",
            "timestamp": "Today, 2:30 PM",
            "description": "The performance of an asset has degraded. Monitor the situation closely.",
            "criticality": "medium",
            "read": false
          },
          {
            "id": 6,
            "title": "Asset Offline",
            "timestamp": "Today, 3:45 PM",
            "description": "An asset is currently offline and not responding to requests.",
            "criticality": "high",
            "read": false
          },
          {
            "id": 7,
            "title": "Security Alert",
            "timestamp": "Today, 4:15 PM",
            "description": "A security alert has been triggered on an asset. Verify the security measures.",
            "criticality": "low",
            "read": false
          },
          {
            "id": 8,
            "title": "Scheduled Maintenance",
            "timestamp": "Today, 5:00 PM",
            "description": "Scheduled maintenance will be performed on certain assets at the specified time.",
            "criticality": "medium",
            "read": true
          },
          {
            "id": 9,
            "title": "OS update required",
            "timestamp": "Today, 6:30 PM",
            "description": "The operating system of your instance needs to be updated before 7/8/2023",
            "criticality": "high",
            "read": false
          }
        ]
    }
  
    getAllRecords(): Promise<NotificationPayload[]> {
      return Promise.resolve(this.notifications);
    }
  
    getUnreadRecords(): Promise<NotificationPayload[]> {
      return Promise.resolve(this.notifications.filter((notification) => !notification.read));
    }
  
    markAllAsRead(): Promise<void> {
      this.notifications = this.notifications.map((notification) => ({ ...notification, read: true }));
      return Promise.resolve();
    }
  
    markRecordsAsRead(recordIds: number | number[]): Promise<void> {
      this.notifications = this.notifications.map((notification) => {
        if (Array.isArray(recordIds)) {
          return recordIds.some((id) => notification.id === id) ? { ...notification, read: true } : notification;
        } else {
          return notification.id === recordIds ? { ...notification, read: true } : notification;
        }
      });
      return Promise.resolve();
    }
}
  
export default MockNotificationsApi;
