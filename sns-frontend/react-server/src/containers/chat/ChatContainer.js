// import { useNavigate } from 'react-router-dom';
import ChatComponent from '../../components/chat/ChatComponent';
import {
  enterRoom,
  concatChats,
  changeField,
  sendChat, translateChat, translateChats
} from '../../modules/chats';
import qs from 'qs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const ChatContainer = () => {
  // const params = useParams();
  const dispatch = useDispatch();
  const { room, chats, chatTxt, error, user, translatedChat } = useSelector(
    ({ chats, auth }) => ({
      room: chats.room,
      chats: chats.chats,
      chatTxt: chats.chatTxt,
      error: chats.error,
      user: auth.user,
      translatedChat: chats.translatedChat
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
    dispatch(sendChat({ roomId: room._id, chatTxt, user }));
  };

  useEffect(() => {
    if (room && !error) {
      const socket = io.connect(
        `${process.env.REACT_APP_NODE_SERVER_URL}/chat`,
        {
          path: '/socket.io',
          transports: ['websocket'],
        }
      );

      socket.emit('join', { roomId: room._id, user: chats.users });
      // socket.on('join', function (data) {
      //   // 입장
      //   const newChat = data.chat;
      //   dispatch(concatChats({ newChat }));
      // });
      // socket.on('exit', function (data) {
      //   // 퇴장
      //   const newChat = data.chat;
      //   dispatch(concatChats({ newChat }));
      // });
      socket.on('chat', function (data) {
        // 채팅
        const newChat = data.chat;
        dispatch(concatChats({ newChat }));
      });

      return () => {
        socket.disconnect(); // 언마운트 시 chat 네임스페이스 접속 해제
      };
    }
  }, [room]);

  useEffect(() => {
    const socket = io.connect(
      `${process.env.REACT_APP_NODE_SERVER_URL}/papago/translateAndDetectLang`,
      {
        path: '/socket.io',
        transports: ['websocket'],
      }
    );

    socket.on('translateChat', function (data) {
      // 채팅 번역
      const translatedChat = data.translateChat;
      dispatch(translateChats({ translatedChat }));
    });

    return () => {
      socket.disconnect(); // 언마운트 시 chat 네임스페이스 접속 해제
    };
  });

  return (
    <ChatComponent
      room={room}
      chats={chats}
      user={user}
      chatTxt={chatTxt}
      translatedChat={translatedChat}
      error={error}
      onChange={onChange}
      onSendChat={onSendChat}
    />
  );
};

export default ChatContainer;
