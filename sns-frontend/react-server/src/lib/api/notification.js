import nodeClient from './nodeClient';
import qs from 'qs';

export const listNotiLog = async ({ memberNo, limit, page }) => {
  const queryString = qs.stringify({ limit, page });
  return await nodeClient.get(`/notification/list/${memberNo}?${queryString}`);
};

export const notReadNotiCount = ({ memberNo }) =>
  nodeClient.get(`notification/notReadNotiCount/${memberNo}`);

export const updateNotiState = ({ _id, notiState }) =>
  nodeClient.post(`notification/updateState`, { _id, notiState });

export const updateAllNotiState = ({ memberNo, notiState }) =>
  nodeClient.post(`notification/updateAllState`, { memberNo, notiState });
