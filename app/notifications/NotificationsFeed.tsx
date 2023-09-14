import React from "react";
import { getUserNotifications } from "../actions/getUserNotifications";
import { BsTwitter } from "react-icons/bs";

const NotificationsFeed = async () => {
  const notifications = await getUserNotifications();

  if (notifications.length === 0) {
    return (
      <div className="p-6 text-center text-xl text-neutral-600">
        No notifications yet
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="
            flex
            items-center
            gap-4
            border-b
          border-neutral-800
            p-6
          "
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
