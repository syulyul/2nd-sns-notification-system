import SocketIO from 'socket.io';
import cookieParser from 'cookie-parser';
import { sendChatBySocket } from './api/chatRoom/ChatRoom.ctrl';
// import Room from './schemas/room';

export default (server, app) => {
  const io = SocketIO(server, {
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true,
    },
    path: '/socket.io',
  });
  app.set('io', io);

  const chat = io.of('/chat');

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');

    const cookies = socket.handshake.headers.cookie.split('; ');
    const parsedCookies = {};
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      parsedCookies[cookieName] = cookieValue;
    }

    socket.on('join', (data) => {
      socket.join(data.roomId);

      // data는 브라우저에서 보낸 방 아이디
      socket.join(data); // 네임스페이스 아래에 존재하는 방에 접속
    });

    socket.on('sendChat', (data) => {
      const reqData = { body: data };
      reqData.cookies = parsedCookies;
      reqData.ioOfChat = chat;
      sendChatBySocket(reqData);
      console.log(reqData.body);
    });

    socket.on('translateChat', (data) => {
      console.log(data);
    });

    // socket.on('disconnect', async () => {
    //   console.log('chat 네임스페이스 접속 해제');
    //   console.log(socket.id, '연결 종료 시 소켓');
    // });
  });
};
