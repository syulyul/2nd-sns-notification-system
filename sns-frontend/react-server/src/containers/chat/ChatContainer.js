// import { useNavigate } from 'react-router-dom';
import ChatComponent from '../../components/chat/ChatComponent';
import { enterRoom, concatChats } from "../../modules/chats";
import qs from "qs";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from 'react-router-dom';
import io from "socket.io-client";

const ChatContainer = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const { room, chats, error, user} = useSelector(
    ({ chats, user }) => ({
      room: chats.room,
      chats: chats.chats,
      error: chats.error,
      user: user.user,
    })
  );

  const { roomId } = params;

  useEffect(() => {
    dispatch(enterRoom({ roomId }));
  }, [roomId]);

  useEffect(() => {
    if (room && !error) {
      const socket = io.connect(`${process.env.REACT_APP_SERVERURL}/chat`, {
        path: "/socket.io",
        transports: ["websocket"],
      });

      socket.emit("join", { roomId, User: user});
      socket.on("join", function (data) {
        // 입장
        const newChat = data.chat;
        dispatch(concatChats({ newChat }));
      });
      socket.on("exit", function (data) {
        // 퇴장
        const newChat = data.chat;
        dispatch(concatChats({ newChat }));
      })
      socket.on("chat", function (data) {
        // 채팅
        const newChat = data.chat;
        dispatch(concatChats({ newChat }));
      });

      return () => {
        socket.disconnect(); // 언마운트 시 chat 네임스페이스 접속 해제
      };
    }
  }, [room]);

  return <ChatComponent 
            room = {room}
            chats = {chats}
            user = {user}
            error = {error}
         />;
};

export default ChatContainer;