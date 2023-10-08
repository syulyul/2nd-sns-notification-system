// import { useNavigate } from 'react-router-dom';
import ChatComponent from '../../components/chat/ChatComponent';
import { useState } from 'react';

const ChatContainer = () => {

  const [chat, setChatData] = useState(
    [{
    room: '1',
    chat: '채팅 내용',
    files: null,
    },
    {
      room: '1',
      chat: '채팅 내용2',
      files: null,
    },
    {
      room: '1',
      chat: '채팅 내용3',
      files: null,
    }],);

  return <ChatComponent chatData = {chat} />;
};

export default ChatContainer;