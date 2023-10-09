// import { useNavigate } from 'react-router-dom';
import ChatRoomListComponent from '../../components/chat/ChatRoomListComponent';
import ChatComponent from '../../components/chat/ChatComponent';
import { useState } from 'react';
import styled from 'styled-components';

const ChatRoomList = styled.div`
  display: flex;
  padding: 20px;
`;

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh; /* 화면 높이의 100%로 컨테이너를 채움 */
`;

const ChatRoomListContainer = () => {

  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    { _id: '1', title: '쫀떠기1' },
    { _id: '2', title: '쫀떠기2' },
    { _id: '3', title: '쫀떠기3' },
    { _id: '4', title: '쫀떠기4' },
    { _id: '5', title: '쫀떠기5' },
    { _id: '6', title: '쫀떠기6' },
    { _id: '7', title: '쫀떠기7' },
    // { chat },
  ];

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <CenteredContainer>
    <ChatRoomList>
      <div>
      <ChatRoomListComponent rooms = {rooms} onSelectRoom={handleSelectRoom} />
      </div>
      {selectedRoom && (
        <div>
          {/* <h2>{selectedRoom.title}</h2> */}
          {/* 선택한 채팅방 내용을 여기에 표시할 수 있음 */}
          <ChatComponent />
        </div>
      )}
    </ChatRoomList>
    </CenteredContainer>
  );
};

export default ChatRoomListContainer;