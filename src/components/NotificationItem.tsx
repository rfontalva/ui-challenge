import {NotificationPayload} from "../interfaces/NotificationPayload";
import '../styles/NotificationItem.css';

export interface NotificationItemProps extends NotificationPayload
{
    markAsRead: (id: number) => void
}

const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const statusIcon = props.read ? "fa fa-envelope-open" : "fa fa-envelope";

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!(event.target as HTMLElement).classList.contains("read-status")) {
      window.open(`/notification/${props.id}`, "_blank");
    }
    props.markAsRead(props.id);
  };

  return (
    <div className="notification-item" id={`notification-item${props.id}`} onClick={handleItemClick}>
        <div className={`circle ${props.criticality}`}/>
        <div className="notification-content">
            <h4>{props.title}</h4>
            <p className="timestamp">{props.timestamp}</p>
            <p className="description">{props.description}</p>
        </div>
        <i className={`${statusIcon} read-status`} id="mark-as-read-icon" onClick={handleItemClick}></i>
    </div>
  )
}

export default NotificationItem
