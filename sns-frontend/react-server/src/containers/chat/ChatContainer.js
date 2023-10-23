// import { useNavigate } from 'react-router-dom';
import ChatComponent from '../../components/chat/ChatComponent';
import {
  enterRoom,
  concatChats,
  changeField,
  sendChat,
  translateChat,
  loadBeforeChats,
} from '../../modules/chats';
import qs from 'qs';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { socket } from '../../socket';
import { roomList } from '../../modules/rooms';

const ChatContainer = () => {
  // const params = useParams();
  const dispatch = useDispatch();
  const [targetLanguage, _setTargetLanguage] = useState('ko');
  const targetLanguageRef = useRef(targetLanguage);
  const setTargetLanguage = (data) => {
    targetLanguageRef.current = data;
    _setTargetLanguage(data);
  };

  const { room, chats, newChat, chatTxt, error, user, translatedChat, page } =
    useSelector(({ chats, auth }) => ({
      room: chats.room,
      chats: chats.chats,
      chatTxt: chats.chatTxt,
      error: chats.error,
      user: auth.user,
      translatedChat: chats.translatedChat,
      newChat: chats.newChat,
      page: chats.nextPage,
    }));

  const { search } = useLocation();
  const { mno1, mno2, roomId } = qs.parse(search, { ignoreQueryPrefix: true });

  useEffect(() => {
    dispatch(enterRoom({ mno1, mno2, roomId }));
  }, [mno1, mno2, roomId]);

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
    if (room) {
      dispatch(roomList(user.no));
    }
  }, [room, user]);

  useEffect(() => {
    if (room && !error) {
      if (!socket.connected) {
        socket.connect();
      }

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
        if (user.no !== newChat.user.mno) {
          onTranslate(newChat);
        }
      });

      socket.on('translateChat', function (data) {
        // 채팅
        const translatedChatLog = data.translatedChatLog;
        dispatch(translateChat({ translatedChatLog }));
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [room]);

  useEffect(() => {
    if (socket) {
    }
  }, [socket]);

  const onSendChat = (e) => {
    e.preventDefault();

    // dispatch(sendChat({ roomId: room._id, chatTxt, user }));
    if (socket) {
      if (chatTxt.length > 0) {
        dispatch(sendChat({ roomId: room._id, chatTxt, user }));
        socket.emit('sendChat', { roomId: room._id, chatTxt });
      }
    }
  };

  const onTranslate = (chatLog) => {
    // console.log(chatLog);
    const req = {};
    req.targetLanguage = targetLanguageRef.current;
    req.chatLog = chatLog;
    if (socket) {
      socket.emit('translateChat', req);
    }
  };

  const onLoadBeforeChats = () => {
    dispatch(loadBeforeChats({ roomId: room._id, mno1, mno2, page }));
  };

  return (
    <ChatComponent
      room={room}
      chats={chats}
      newChat={newChat}
      user={user}
      chatTxt={chatTxt}
      translatedChat={translatedChat}
      error={error}
      onChange={onChange}
      onSendChat={onSendChat}
      onTranslate={onTranslate}
      targetLanguage={targetLanguage}
      setTargetLanguage={setTargetLanguage}
      onLoadBeforeChats={onLoadBeforeChats}
    />
  );
};

export default ChatContainer;
