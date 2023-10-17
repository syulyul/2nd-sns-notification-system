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

const ProfileImagesContainer = styled.div`
  position: relative;
  width: 70px; 
  height: 35px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;

  /* 첫 번째 이미지 */
  &:first-of-type {
    left: 0;
    top: -20px;
    left: -10px;
  }

  /* 두 번째 이미지 */
  &:nth-of-type(2) {
    left: 50%; /* 이미지의 중간부터 시작되도록 설정 */
    top: -15px;
    transform: translate(-20px, 20px); /* X축과 Y축을 이용하여 이미지를 원하는 만큼 이동 */
  }
`;

const NicknameContainer = styled.div`
  position: relative;
`;

const ListComponent = styled.div`
  display: flex;
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
              <ListComponent>
              <ProfileImagesContainer>
              <ProfileImage src={`https://kr.object.ncloudstorage.com/bitcamp-nc7-bucket-14/sns_member/${room.users[0].photo}`} alt="Profile 0" />
              <ProfileImage src={`https://kr.object.ncloudstorage.com/bitcamp-nc7-bucket-14/sns_member/${room.users[1].photo}`} alt="Profile 1" />
              </ProfileImagesContainer>
              <NicknameContainer>
              {`${room.users[0].nick}, ${room.users[1].nick}`}
              </NicknameContainer>
              </ListComponent>
            </ChatRoomItem>
          </ChatRoomItemContainer>
        ))}
      </ChatRoomListBox>
    </ChatRoomList>
  );
};

export default ChatRoomListComponent;
