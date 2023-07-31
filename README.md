# UI Engineer - Frontend Coding Test

## Requirements

Create a Notifications component that will use the Anomaly Service as one of its sources. The requirements for the Notifications component are that:

- A button that forms part of the header toolbox
- The button toggles a drawer with the full list of unread notifications for the
user
- The drawer should also close if the user clicks out of the component
- Each notification will have these elements
  - An icon that identifies the type of notification
  - A title
  - A rich description
  - A “read” badge
  - A check to mark “read” even if not clicked
- When a notification is clicked the client routes to the related metric
- A notification is marked “read” as soon as it is clicked
- A notification should disappear when it is marked “read”
- An action to mark “all as read”

## Considerations

- Notifications were considered to have unique ids, even across different orgIds.
- The associated payload to each notification is considered to be title, timestamp, criticality, description and read status.
- The routing is done to another url endpoint in the form of /notification/:id.
- The check to mark the notifications as read was replaced by an envelope, that indicates if the notifications has been read or not, and, when clicked on, it changes the state of the item. Once the notification has been marked as read it can't go back to the unread state.
- The service is passed to the notifications component using a context, and is, for testing purpouses directly implemented as the MockNotificationsApi service, in order for the component to use a real api, the ```App.tsx``` file should be modified to acquire the orgId and create a NotificationsApi service to pass down to the NotificationsServiceContext.
- The pulling of notifications is done only when the page is refreshed and the component rerendered, there is no scheduled pull.

## Project setup

In the root directory of the project, run:

```npm install```

```npm run dev```

To run the test cases:

```npm test```
