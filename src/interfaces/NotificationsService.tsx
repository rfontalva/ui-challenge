import { NotificationPayload } from "./NotificationPayload";

export interface NotificationsService {
    getAllRecords(): Promise<NotificationPayload[]>;
    getUnreadRecords(): Promise<NotificationPayload[]>;
    markAllAsRead(): Promise<void>;
    markRecordsAsRead(recordIds: number | number[]): Promise<void>;
}
