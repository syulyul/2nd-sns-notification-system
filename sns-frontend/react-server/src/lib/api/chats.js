import qs from "qs";
import client from './nodeClient';

export const roomList = () => {
  return client.get("room");
}

export const createRoom = ({ mno1, mno2 }) => {
  const queryString = qs.stringify({
    mno1,
    mno2,
  });
  return client.post(`room?${queryString}`);
};

export const enterRoom = ({ roomId }) => {
  return client.get(`room?${roomId}`);
};

export const removeRoom = ({ roomId }) => {
  return client.delete(`room/${roomId}`);
}

// 채팅 전송
export const sendChat = ({ roomId, chat, files }) => {
  return client.post(`room/${roomId}/chat`, {
    chat,
    files,
  });
};