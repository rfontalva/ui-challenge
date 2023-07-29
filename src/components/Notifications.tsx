import { useEffect, useState } from "react"
import NotificationItem from "./NotificationItem";
import {NotificationPayload} from "../interfaces/NotificationPayload";
import mockNotifications from "../data/MockNotifications";
import './Notifications.css'


const Notifications: React.FC = () => {
  const [display, setDisplay] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: number) => { 
      const updatedNotifications = notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      );
    // fetch(`/api/anomaly-service/${orgId}/mark-read?messageId=${id}`, {method:'POST'})
      setNotifications(updatedNotifications)
  }

  const markAllAsRead = () => { 
    const updatedNotifications = notifications.map(notification =>  {
      return { ...notification, read: true }
    });
    // fetch(`/api/anomaly-service/${orgId}/mark-read`, {method:'POST'})
    setNotifications(updatedNotifications)
}

  const compareNotifications = (a: NotificationPayload, b: NotificationPayload) => {
    if (a.read !== b.read) {
      return a.read ? 1 : -1;
    }
    if (a.criticality !== b.criticality) {
      if (a.criticality === "high") return -1;
      if (a.criticality === "medium") return b.criticality === "high" ? 1 : -1;
      return 1;
    }  

    return 0;
  };

  const displayMenu = () => { 
    if (!display)
    {
      const sortedNotifications = notifications.sort(compareNotifications)
      setNotifications(sortedNotifications)
    }

    setDisplay(!display)
  }
  
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);
  
  return (
    <menu className="navbar-item" onClick={() => displayMenu()}>
      <i className="fa fa-bell fa-2x" aria-hidden="true" />
      {unreadCount > 0 && ( // Render the badge only when there are unread notifications
        <span className="badge">{unreadCount < 9 ? unreadCount : '+9'}</span>
      )}
      {display && (
        <div className="notifications">
          <button className="mark-all-button" onClick={markAllAsRead}>
            Mark All as Read
          </button>
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} {...notification} markAsRead={markAsRead} />
          ))}
        </div>
      )}
    </menu>
  );
}

export default Notifications
