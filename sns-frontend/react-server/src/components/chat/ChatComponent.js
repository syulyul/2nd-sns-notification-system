import React from 'react';
import styled from 'styled-components';
// import { roomList } from '../../modules/rooms';

const ChatContainer = styled.div`
    padding: 20px;
    background-color: #f2f2f2;
    width: 600px;
    margin: auto;
    margin-left: 20px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 위와 아래에 여백을 두고 가운데 정렬 */
`;

const TitleStyle = styled.h1`
    text-align: left;
    margin-left: 20px;
`;

const StyledForm = styled.form`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-left: 20px;
    margin-top: 20px;
`;

const StyledInputContainer = styled.div`
display: inline-flex;
    margin-bottom: 10px;
    align-items: center;
`;

const StyledInput = styled.input`
    box-sizing: border-box;
    height: 42px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.17);
    margin: 0;
    padding: 0 10px;
    width:0px;
    background: transparent;
    width: 80px;
    border: none;
    margin-right: 5px;
    margin-left: 20px;

    &[name='title'] {
        font-size: 25px;
    }

    &[type='file']::-webkit-file-upload-button {
        height: 42px;
        background: #426B1F;
        border-radius: 8px;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 13px;
        line-height: 130%;
        border: none;
        font-family: 'UhBeeKeongKeong', sans-serif;
        &:hover {
          background: rgb(77,77,77);
          color: #fff;
        }
    }
    &[type='text'] {
        font-size: 20px;
        width: 55%;
        border-radius: 6px;
        background: #FFFFFF;
        box-shadow: 0 3px 3px rgba(0,0,0,0.1);
        /* 포커스 스타일 제거 */
        &:focus {
          outline: none;
        }
    }
`;

const StyledChatList = styled.div`
    flex-direction: column-reverse; /* 역순으로 채팅이 쌓이도록 설정 */
    overflow-y: auto; /* 채팅이 넘치면 스크롤 가능하도록 설정 */
    margin: 0 40px 10px 40px;
`;

const ChatMessage = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 10px auto;
    word-wrap: break-word;
`;

const Username = styled.div`
    font-size: 17px;
`;

const UserImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    margin-bottom: 20px;
`;

const StyledChatItem = styled.div`
  .StyledChatMine {
    position: relative;
    background: #426B1F;
    color: #FFFFFF;
    font-size: 16px;
    padding: 10px;
    border-radius: 10px;
    max-width: 60%;
    float: right;
    margin: 10px auto;
    margin-bottom:20px;
    align-self: flex-end;
    word-wrap: break-word; /* 긴 텍스트가 말풍선을 넘어갈 경우 자동으로 줄 바꿈 */
  }

  .StyledChatOther {
    position: relative;
    background: #FFFFFF;
    border: 1px solid #ddd;
    font-size: 16px;
    padding: 10px;
    border-radius: 10px;
    max-width: 80%;
    float: left;
    margin: 10px auto;
    align-self: flex-start;
    word-wrap: break-word; /* 긴 텍스트가 말풍선을 넘어갈 경우 자동으로 줄 바꿈 */
  }
`;

// const StyledChatMine = styled.div`
//     position: relative;
//     background: #426B1F;
//     color: #FFFFFF;
//     font-size: 16px;
//     padding: 10px;
//     border-radius: 10px;
//     max-width: 60%;
//     float: right;
//     margin: 10px auto;
//     margin-bottom:20px;
//     align-self: flex-end;
//     word-wrap: break-word; /* 긴 텍스트가 말풍선을 넘어갈 경우 자동으로 줄 바꿈 */
// `;

// const StyledChatOther = styled.div`
//     position: relative;
//     background: #FFFFFF;
//     border: 1px solid #ddd;
//     font-size: 16px;
//     padding: 10px;
//     border-radius: 10px;
//     max-width: 80%;
//     float: left;
//     margin: 10px auto;
//     align-self: flex-start;
//     word-wrap: break-word; /* 긴 텍스트가 말풍선을 넘어갈 경우 자동으로 줄 바꿈 */
// `;

const StyledChatBtn = styled.button`
    width: 100px;
    height: 41px;
    background: #426B1F;
    border-radius: 8px;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    border: none;
    cursor: pointer;
    margin: 10px;
    align-self: flex-end; /* 맨 아래에 정렬 */
    &:hover {
      background: rgb(77,77,77);
      color: #fff;
    }
`;

const ChatItem = ({ chatlog, loginUser }) => {
  const { _id, room, user, chat, files, createdAt } = chatlog;
  const roomId = _id;

  return (
    <StyledChatItem
      className={
        loginUser.nick === user.nick
        ? "styledChatMine"
        : "StyledChatOther"
      }
    >

    </StyledChatItem>
  )
}

const ChatComponent = ({ room, chats, user, onChange, onSubmit }) => {
  // const profileUrl = `http://gjoxpfbmymto19010706.cdn.ntruss.com/sns_member/${user.photo}?type=f&w=270&h=270&faceopt=true&ttype=jpg`;
  return (
    <ChatContainer>
      <TitleStyle>{`🌱  🌱`}</TitleStyle>
      <StyledChatList>
          <ChatMessage>
            {chats && (
              <div>
              {/* <StyledChatMine
                  type="text"
                  name="chat"
              >`${chats}`</StyledChatMine>
            </div>
            <div>
              <StyledChatMine
                  type="text"
                  name="chat"
              >`${chats}`</StyledChatMine>
            </div>
            </ChatMessage>
            <ChatMessage>
            <UserImage src="https://i.namu.wiki/i/Pt5YVNhD6kySJXOhxFVDDTG3m1xeJcGzHz3gDQhqBfxqWHDRaj5moJsqB4GT3voAIBDlUyvDozVRDn7C3Hg6eEC2EXJjEOSzTX9HoTGfKZ5H53V7GwrYQjJwgL58PjhL2cUTgSMg9K0u6Cb9dPqk9w.webp" alt="User" />
              <div>
                <Username>쫀떠기</Username>
                <StyledChatOther
                    type="text"
                    name="chat"
                >남이 쓴 채팅 어떻게 받아오지 아아아아아ㅏ아아아아ㅏ아</StyledChatOther> */}
                
                {chats.map((chatlog) => (
                  <StyledChatItem chatlog={chatlog} key={chats._id} user={user} />
                ))}
              </div>
            )}
          
          </ChatMessage>
          
      </StyledChatList>
      <StyledForm>
        <StyledInputContainer>
          <StyledInput
            type="text"
            name="sendChat"
            multiple
            placeholder="메시지를 입력하세요"
          />
          <StyledInput
            type="file"
            name="files"
            multiple
          />
          <StyledChatBtn type="submit" onClick={onSubmit}>
            보내기
          </StyledChatBtn>
        </StyledInputContainer>
      </StyledForm>
    </ChatContainer>
  );
};

export default ChatComponent;
