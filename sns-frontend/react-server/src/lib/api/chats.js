import qs from "qs";
import nodeClient from './nodeClient';

export const roomList = (mno) => {
  return nodeClient.get(`chatRoom/room/${mno}`);
}

export const createRoom = ({ mno1, mno2 }) => {
  const queryString = qs.stringify({
    mno1,
    mno2,
  });
  return nodeClient.post(`room?${queryString}`);
};

export const enterRoom = ({ roomId }) => {
  return nodeClient.get(`room?${roomId}`);
};

export const removeRoom = ({ roomId }) => {
  return nodeClient.delete(`room/${roomId}`);
}

// 채팅 전송
export const sendChat = ({ roomId, chat, files }) => {
  return nodeClient.post(`room/${roomId}/chat`, {
    chat,
    files,
  });
};