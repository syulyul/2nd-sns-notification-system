// import { useNavigate } from 'react-router-dom';
import ChatComponent from '../../components/chat/ChatComponent';
import {
  enterRoom,
  concatChats,
  changeField,
  sendChat,
} from '../../modules/chats';
import qs from 'qs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import io from 'socket.io-client';

const ChatContainer = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { room, chats, chatTxt, error, user } = useSelector(
    ({ chats, auth }) => ({
      room: chats.room,
      chats: chats.chats,
      chatTxt: chats.chatTxt,
      error: chats.error,
      user: auth.user,
    })
  );

  const { search } = useLocation();
  const { mno1, mno2 } = qs.parse(search, { ignoreQueryPrefix: true });

  useEffect(() => {
    dispatch(enterRoom({ mno1, mno2 }));
  }, [mno1, mno2]);

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        key: name,
        value,
      })
    );
  };

  const onSendChat = () => {
    dispatch(sendChat({ roomId: room._id, chatTxt }));
  };

  // useEffect(() => {
  //   if (room && !error) {
  //     const socket = io.connect(`${process.env.REACT_APP_SERVERURL}/chat`, {
  //       path: '/socket.io',
  //       transports: ['websocket'],
  //     });

  //     socket.emit('join', { roomId, User: user });
  //     socket.on('join', function (data) {
  //       // 입장
  //       const newChat = data.chat;
  //       dispatch(concatChats({ newChat }));
  //     });
  //     socket.on('exit', function (data) {
  //       // 퇴장
  //       const newChat = data.chat;
  //       dispatch(concatChats({ newChat }));
  //     });
  //     socket.on('chat', function (data) {
  //       // 채팅
  //       const newChat = data.chat;
  //       dispatch(concatChats({ newChat }));
  //     });

  //     return () => {
  //       socket.disconnect(); // 언마운트 시 chat 네임스페이스 접속 해제
  //     };
  //   }
  // }, [room]);

  return (
    <ChatComponent
      room={room}
      chats={chats}
      user={user}
      chatTxt={chatTxt}
      error={error}
      onChange={onChange}
      onSendChat={onSendChat}
    />
  );
};

export default ChatContainer;
