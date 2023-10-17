import React from 'react';
import styled from 'styled-components';

const ChatRoomItemContainer = styled.div`
  background-color: #ffffff;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #dcdcdc;
  }
  border-radius: 15px;
`;

const ChatRoomList = styled.div`
  width: 350px;
  height: 700px;
  display: inline-block;
  background-color: #f2f2f2;
  padding: 20px;
  margin-left:380px;
  //margin-top:-100px;
`;

const ChatRoomListBox = styled.div`
  width: 350px;
  height: 600px;
  display: inline-block;
  background-color: #f2f2f2;
  overflow-y: auto; /* 목록이 넘치면 스크롤 가능하도록 설정 */
`;

const ChatRoomItem = styled.div`
  font-size: 20px;
  padding: 30px;
`;

const ChatRoomListComponent = ({ rooms, onSelectRoom }) => {
  return (
    <ChatRoomList>
      <h2>채팅방 목록</h2>
      <ChatRoomListBox>
        {rooms.map((room) => (
          <ChatRoomItemContainer>
            <ChatRoomItem
              key={room._id}
              onClick={(e) => {
                console.log(room);
                onSelectRoom(room.users);
              }}
            >
              {`${room.users[0].nick}, ${room.users[1].nick}`}
            </ChatRoomItem>
          </ChatRoomItemContainer>
        ))}
      </ChatRoomListBox>
    </ChatRoomList>
  );
};

export default ChatRoomListComponent;
