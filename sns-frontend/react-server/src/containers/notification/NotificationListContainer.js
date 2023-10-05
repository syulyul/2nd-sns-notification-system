// NotificationListContainer.jsx
import React, { useState, useEffect } from 'react';
import NotificationListComponent from '../../components/notification/NotificationListComponent';

const NotificationListContainer = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const mockData = [
      { id: 1, content: "첫 번째 알림", notiState: 0, url: "#" },
      { id: 2, content: "두 번째 알림", notiState: 1, url: "#" }
    ];
    setNotifications(mockData);
  }, []);

  return <NotificationListComponent notifications={notifications} />;
};

export default NotificationListContainer;