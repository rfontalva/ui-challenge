import { useEffect, useState, useRef, useContext, useLayoutEffect } from "react"
import NotificationItem from "./NotificationItem";
import {NotificationPayload} from "../interfaces/NotificationPayload";
import { NotificationsService } from "../interfaces/NotificationsService";
import NotificationsServiceContext from "../context/NotificationsServiceContext";
import '../styles/Notifications.css';


const Notifications: React.FC = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);
  const notificationsWrapperRef = useRef<HTMLMenuElement>(null);
  const service: NotificationsService = useContext(NotificationsServiceContext)

  const markAsRead = (id: number) => { 
    try
    {
      service.markRecordsAsRead(id);
    } catch (error)
    {
      console.error(error);
    }
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications)
  }

  const markAllAsRead = () => {
    try
    {
      service.markAllAsRead();
    } catch (error)
    {
      console.error(error);
    }
    const updatedNotifications = notifications.map(notification =>  {
      return { ...notification, read: true }
    });
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

  const displayMenu = async () => { 
    if (!display)
    {
      let filteredNotifications: NotificationPayload[] | Promise<NotificationPayload>;
      try
      {
        filteredNotifications = await service.getUnreadRecords();
        const sortedNotifications = filteredNotifications.sort(compareNotifications);
        setNotifications(sortedNotifications);
        setDisplay(!display);
      } catch (error)
      {
        console.error(error);
      }
    }
  }

  const handleCloseMenu = (event: MouseEvent) => {
    if (notificationsWrapperRef.current && !notificationsWrapperRef.current.contains(event.target as Node)) {
      setDisplay(false);
    }
  };

  useLayoutEffect(() => {
    service.getUnreadRecords().then((unreadNotifications) => {
         const count = unreadNotifications.length; 
         setUnreadCount(count);
    }).catch((error) => { console.log(error) });
    
    document.addEventListener("click", handleCloseMenu);
  
    return () => {
      document.removeEventListener("click", handleCloseMenu);
    };
  }, [service]);
  
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);
  
  return (
    <menu 
      ref={notificationsWrapperRef} 
      className="navbar-item" 
      onClick={async () => await displayMenu()}
    >
      <i className="fa fa-bell fa-2x" id='bell-icon' aria-hidden="true" />
      {unreadCount > 0 && (
        <span id="badge">{unreadCount < 9 ? unreadCount : '+9'}</span>
      )}
      {display && (
        <div className="notifications">
          <button id="mark-all-button" onClick={markAllAsRead}>
            Mark All as Read
          </button>
          {unreadCount > 0 ? notifications.map((notification) => (
            <NotificationItem key={notification.id} {...notification} markAsRead={markAsRead} />
          )) : 
          <div>
              <div className="notification-content">
                  <h4 id='no-unread'>You have no unread notifications</h4>
              </div>
          </div>
          }
        </div>
      )}
    </menu>
  );
}

export default Notifications
