import qs from 'qs';
import nodeClient from './nodeClient';

export const roomList = (mno) => {
  return nodeClient.get(`chatRoom/room/${mno}`);
};

export const createRoom = ({ mno1, mno2 }) => {
  const queryString = qs.stringify({
    mno1,
    mno2,
  });
  return nodeClient.post(`chatRoom/room?${queryString}`);
};

export const enterRoom = ({ mno1, mno2 }) => {
  const queryString = qs.stringify({
    mno1,
    mno2,
  });
  return nodeClient.get(`chatRoom/enterRoom?${queryString}`);
};

export const removeRoom = ({ roomId }) => {
  return nodeClient.delete(`chatRoom/room/${roomId}`);
};

// 채팅 전송
export const sendChat = ({ roomId, chatTxt, files, user }) => {
  return nodeClient.post(`chatRoom/room/${roomId}/chat`, {
    chatTxt,
    files,
    user,
  });
};
