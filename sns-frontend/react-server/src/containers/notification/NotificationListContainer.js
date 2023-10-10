// NotificationListContainer.jsx
import React, { useState, useEffect } from 'react';
import NotificationListComponent from '../../components/notification/NotificationListComponent';
import { useDispatch, useSelector } from 'react-redux';
import { notiList } from '../../modules/notification';

const NotificationListContainer = () => {
  const [notificationData, setNotificationData] = useState([
    { id: 1, content: '첫 번째 알림', notiState: 0, url: '#' },
    { id: 2, content: '두 번째 알림', notiState: 1, url: '#' },
  ]);

  const dispatch = useDispatch();
  const { user, notis, error } = useSelector(({ auth, notification }) => ({
    user: auth.user,
    notis: notification.notis,
    error: notification.error,
  }));

  useEffect(() => {
    dispatch(notiList({ memberNo: 1, limit: 10, page: 1 }));
  }, [dispatch]);

  return <NotificationListComponent notificationData={notificationData} />;
};

export default NotificationListContainer;
