import { createContext } from "react";
import { NotificationsService } from "../interfaces/NotificationsService";
import MockNotificationsApi from "../services/MockNotificationsApi";

const NotificationsServiceContext = createContext<NotificationsService>(new MockNotificationsApi());

export default NotificationsServiceContext;
