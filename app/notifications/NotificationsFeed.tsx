import React from "react";
import { getUserNotifications } from "../actions/getUserNotifications";

const NotificationsFeed = async () => {
  const notifications = await getUserNotifications();

  if (notifications.length === 0) {
    return (
      <div
        className="
          p-6
          text-center
          text-xl
          text-neutral-600
        "
      >
        No notifications yet
      </div>
    );
  }

  return <div></div>;
};

export default NotificationsFeed;
