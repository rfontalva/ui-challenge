export interface NotificationPayload {
    id: number,
    title: string,
    criticality: "low" | "medium" | "high",
    timestamp: string,
    description: string,
    read: boolean,
}
