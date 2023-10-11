// NotificationListContainer.jsx
import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { useLocation, useParams } from 'react-router-dom';
import NotificationListComponent from '../../components/notification/NotificationListComponent';
import { useDispatch, useSelector } from 'react-redux';
import { notiList, readNoti } from '../../modules/notification';

const NotificationListContainer = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { user, notis, lastPage, error } = useSelector(
    ({ auth, notification }) => ({
      user: auth.user,
      notis: notification.notis,
      lastPage: notification.lastPage,
      error: notification.error,
    })
  );

  const { limit = 10, page = 1 } = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    if (user) {
      dispatch(notiList({ memberNo: user.no, limit, page }));
    }
  }, [user, dispatch]);

  const onReadNotiLog = (e) => {
    const { name } = e.target;
    dispatch(readNoti({ _id: name }));
  };

  return (
    <NotificationListComponent
      notis={notis}
      page={page}
      query={query}
      lastPage={lastPage}
      onReadNotiLog={onReadNotiLog}
    />
  );
};

export default NotificationListContainer;
