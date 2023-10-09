import client from './client';

// 채팅 전송
export const sendChat = ({ roomId, chat, files }) =>
    client.post('/node/chat/sendChat', {
      chat,
      files,
    });