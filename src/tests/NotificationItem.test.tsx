import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NotificationItem, {NotificationItemProps} from "../components/NotificationItem";
import { NotificationsService } from "../interfaces/NotificationsService";
import {configure} from '@testing-library/react'

configure({testIdAttribute: 'id'})
const mockService: jest.Mocked<NotificationsService> = {
  getUnreadRecords: jest.fn(() => Promise.resolve([])),
  markRecordsAsRead: jest.fn(),
  markAllAsRead: jest.fn(),
  getAllRecords: jest.fn(),
};

const markAsRead = jest.fn();

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useContext: jest.fn(() => mockService),
}));

describe("NotificationItem component", () => {
  jest.spyOn(window, 'open');
  let mockUnreadNotification: NotificationItemProps;
  beforeEach(() => {
    mockUnreadNotification = {
      id: 1,
      title: "Notification 1",
      read: false,
      criticality: 'low',
      timestamp: '',
      description: '',
      markAsRead: markAsRead
    };
    render(<NotificationItem {...mockUnreadNotification}/>);
  });
  
  it("should mark a notification as read when the mark as read icon is clicked", async () => {  
    const markAsReadIcon = await screen.findByTestId("mark-as-read-icon");
    fireEvent.click(markAsReadIcon);
    expect(markAsRead).toHaveBeenCalledWith(1);
  });
  
  it("should not open a new tab with the notification details when clicking the mark as read icon", async () => {
    const markAsReadIcon = await screen.findByTestId("mark-as-read-icon");
    fireEvent.click(markAsReadIcon);
    expect(window.open).not.toHaveBeenCalled();
  });
  
  it("should mark a notification as read when the item is clicked", async () => {
    const notificationItem = await screen.findByText("Notification 1");
    fireEvent.click(notificationItem);
    expect(markAsRead).toHaveBeenCalledWith(1);
  });

  it("should open a new tab with the notification details when clicking outside the mark as read icon", async () => {
    const notificationItem = await screen.findByTestId(`notification-item${mockUnreadNotification.id}`);
    fireEvent.click(notificationItem);
    expect(window.open).toHaveBeenCalledWith("/notification/1", "_blank");
  });
});
