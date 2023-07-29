import {NotificationPayload} from "../interfaces/NotificationPayload";

const mockNotifications: NotificationPayload[] = [
    {
      id: 1,
      title: "Notification Title 1",
      timestamp: "Today, 12:30 PM",
      description:"One-line description here...",
      criticality: "low",
      read: false,
    },
    {
      id: 2,
      title: "Notification Title 2",
      timestamp: "Today, 12:30 PM",
      description:"One-line description here...",
      criticality: "medium",
      read: false
    },
    {
      id: 3,
      title: "Notification Title 3",
      timestamp: "Today, 12:30 PM",
      description:"One-line description here...",
      criticality: "high",
      read: false
    },
    {
      id: 4,
      title: "Notification Title 4",
      timestamp: "Today, 12:30 PM",
      description:"One-line description here...",
      criticality: "medium",
      read: false,
    },
    {
      id: 5,
      title: "Notification Title 5",
      timestamp: "Today, 12:30 PM",
      description:"One-line description here...",
      criticality: "medium",
      read: false
    },
    {
      id: 6,
      title: "Notification Title 6",
      timestamp: "Today, 12:30 PM",
      description:"One-line description here...",
      criticality: "high",
      read: false
    }
]

export default mockNotifications;
