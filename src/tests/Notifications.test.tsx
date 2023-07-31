import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Notifications from "../components/Notifications";
import { NotificationsService } from "../interfaces/NotificationsService";
import { NotificationPayload } from "../interfaces/NotificationPayload";
import {configure} from '@testing-library/react'

configure({testIdAttribute: 'id'})
const mockService: jest.Mocked<NotificationsService> = {
  getUnreadRecords: jest.fn(() => Promise.resolve([])),
  markRecordsAsRead: jest.fn(),
  markAllAsRead: jest.fn(),
  getAllRecords: jest.fn(),
};

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useContext: jest.fn(() => mockService),
}));

describe("Notifications component", () => {
  jest.spyOn(window, 'open');
  let mockUnreadNotifications: NotificationPayload[];
  beforeEach(() => {
    mockUnreadNotifications = [
      { id: 1, title: "Notification 1", read: false, criticality: 'low', timestamp: '',  description: ''},
      { id: 2, title: "Notification 2", read: false, criticality: 'low', timestamp: '',  description: '' },
    ];
    mockService.getUnreadRecords.mockResolvedValue(mockUnreadNotifications);
    render(<Notifications />);
  })

  it("should render the bell icon", () => {
    const bellIcon = screen.getByTestId("bell-icon");
    expect(bellIcon).toBeInTheDocument();
  });

  it("should display the unread notification count badge", async () => {
    const badge = await screen.findByTestId("badge");
    expect(badge).toHaveTextContent("2");
  });

  it("should mark all notifications as read when 'Mark All as Read' button is clicked", async () => {
    const bellIcon = await screen.findByTestId("bell-icon");
    fireEvent.click(bellIcon);
    const markAllButton = await screen.findByTestId("mark-all-button");
    fireEvent.click(markAllButton);
    expect(mockService.markAllAsRead).toHaveBeenCalledTimes(1);
  });

  it("should mark a notification as read when the notification item is clicked", async () => {
    const bellIcon = await screen.findByTestId("bell-icon");
    fireEvent.click(bellIcon);
    const notificationItem = await screen.findByText("Notification 1");
    fireEvent.click(notificationItem);
    expect(mockService.markRecordsAsRead).toHaveBeenCalledWith(1);
  });
});
