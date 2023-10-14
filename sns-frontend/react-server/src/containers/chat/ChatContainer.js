// import { useNavigate } from 'react-router-dom';
import ChatComponent from '../../components/chat/ChatComponent';
import {
  enterRoom,
  concatChats,
  changeField,
  sendChat,
  translateChat,
  translateChats,
} from '../../modules/chats';
import qs from 'qs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const ChatContainer = () => {
  // const params = useParams();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const { room, chats, chatTxt, error, user, translatedChat } = useSelector(
    ({ chats, auth }) => ({
      room: chats.room,
      chats: chats.chats,
      chatTxt: chats.chatTxt,
      error: chats.error,
      user: auth.user,
      translatedChat: chats.translatedChat,
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

  useEffect(() => {
    if (room && !error) {
      setSocket(
        io.connect(`${process.env.REACT_APP_NODE_SERVER_URL}/chat`, {
          path: '/socket.io',
          transports: ['websocket'],
        })
      );

      if (socket) {
        socket.emit('join', { roomId: room._id });
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

        socket.on('translateChat', function (data) {
          // 채팅
          const translatedCharLog = data.translatedCharLog;
          console.log(translatedCharLog);
        });
      }
      return () => {
        socket && socket.disconnect(); // 언마운트 시 chat 네임스페이스 접속 해제
      };
    }
  }, [room]);

  let onSendChat = () => {
    // dispatch(sendChat({ roomId: room._id, chatTxt, user }));
    if (socket) {
      socket.emit('sendChat', { roomId: room._id, chatTxt });
    }
  };

  let onTranslate = (chatLog) => {
    // console.log(chatLog);
    if (socket) {
      socket.emit('translateChat', chatLog);
    }
  };

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
      onTranslate={onTranslate}
    />
  );
};

export default ChatContainer;
