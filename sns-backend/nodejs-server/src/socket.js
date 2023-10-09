import SocketIO from 'socket.io';
// import Chat from "./schemas/chat";
// import Room from "./schemas/room";

export default (server, app, sessionMiddleware) => {
  const io = SocketIO(server, {path: '/socket.io'});
  app.set('io', io);
  const room = io.of('/room');
  const chat = io.of('/chat');

  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  chat.use(wrap(sessionMiddleware));

  room.on('connectioin', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스에 접속 해제');
    });
  });

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');

    socket.on('join', (data) => { // data는 브라우저에서 보낸 방 아이디
      socket.join(data); // 네임스페이스 아래에 존재하는 방에 접속
      socket.to(data).emit('join', {
        Room: data.roomId,
        User: data.User,
        Chat: data.chat,
        files: "",
      });
    });

    socket.on('disconnect', async () => {
      console.log('chat 네임스페이스 접속 해제');
      console.log(socket.id, "연결 종료 시 소켓");
    });
  });
};