import qs from "qs";
import client from './nodeClient';

export const roomList = ({ page }) => {
  const queryString = qs.stringify({
    page,
  });
  return client.get(`room?${queryString}`);
}

export const createRoom = ({ title }) => {
  return client.post("room", {
    title,
  });
};

export const enterRoom = ({ roomId }) => {
  return client.get(`room/${roomId}`);
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