import './NotificationItem.css'
import {NotificationPayload} from "../interfaces/NotificationPayload";

export interface NotificationItemProps extends NotificationPayload
{
    markAsRead: (id: number) => void
}

const NotificationItem = (props : NotificationItemProps) => {
  const statusIcon = props.read ? "fa fa-envelope-open" : "fa fa-envelope"

  return (
    <div className="notification-item" onMouseEnter={() => props.markAsRead(props.id)}>
        <div className={`circle ${props.criticality}`} />
        <div className="notification-content">
            <h4>{props.title}</h4>
            <p className="timestamp">{props.timestamp}</p>
            <p className="description">{props.description}</p>
        </div>
        <i className={`${statusIcon} read-status`}></i>
    </div>
  )
}

export default NotificationItem
