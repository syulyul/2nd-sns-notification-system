import { useNavigate } from 'react-router-dom';
import ChatRoomListComponent from '../../components/chat/ChatRoomListComponent';
import ChatComponent from '../../components/chat/ChatComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { roomList, concatRooms, removeRoom } from '../../modules/rooms';
import styled from 'styled-components';
import auth from '../../modules/auth';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rooms, error, user } = useSelector(({ rooms, auth }) => ({
    rooms: rooms.rooms,
    error: rooms.error,
    user: auth.user,
  }));

  useEffect(() => {
    dispatch(roomList(user.no));
  }, [dispatch, user.no]);

  const handleSelectRoom = (users) => {
    navigate(`/room?mno1=${users[0]}&mno2=${users[1]}`);
  };

  return (
    <CenteredContainer>
      <ChatRoomList>
        <div>
          <ChatRoomListComponent
            rooms={rooms}
            onSelectRoom={handleSelectRoom}
          />
        </div>
      </ChatRoomList>
    </CenteredContainer>
  );
};

export default ChatRoomListContainer;
