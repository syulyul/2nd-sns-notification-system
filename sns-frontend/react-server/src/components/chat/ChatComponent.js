import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { useRef, useEffect } from 'react';
import { useState } from 'react';
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

const SendChatBlock = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 20px;
  margin-top: 20px;
`;

const StyledSubmitForm = styled.form`
  display: inline-flex;
  margin-bottom: 10px;
  align-items: center;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  height: 42px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.17);
  margin: 0;
  padding: 0 10px;
  width: 0px;
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
    background: #426b1f;
    border-radius: 8px;
    color: #ffffff;
    font-weight: bold;
    font-size: 13px;
    line-height: 130%;
    border: none;
    font-family: 'UhBeeKeongKeong', sans-serif;

    &:hover {
      background: rgb(77, 77, 77);
      color: #fff;
    }
  }

  &[type='text'] {
    font-size: 20px;
    width: 68%;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
    /* 포커스 스타일 제거 */

    &:focus {
      outline: none;
    }
  }
`;

const StyledChatList = styled.div`
  flex-direction: column-reverse; /* 역순으로 채팅이 쌓이도록 설정 */
  overflow-y: auto; /* 채팅이 넘치면 스크롤 가능하도록 설정 */
  margin: 0 30px 10px 40px;
`;

const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: flex-start;
  margin: 10px auto;
  margin-bottom: 0px;
  word-wrap: break-word;

  .StyledChatMine {
    position: relative;
    background: #426b1f;
    color: #ffffff;
    font-size: 16px;
    padding: 10px;
    border-radius: 10px;
    // max-width: 70%;
    float: right;
    margin: 10px auto;
    margin-bottom: 5px;
    margin-right: 20px;
    padding-right: 10px;
    align-self: flex-end;
    word-wrap: break-word; /* 긴 텍스트가 말풍선을 넘어갈 경우 자동으로 줄 바꿈 */
  }

  .StyledChatOther {
    position: relative;
    background: #ffffff;
    border: 1px solid #ddd;
    font-size: 16px;
    padding: 10px;
    border-radius: 10px;
    // max-width: 70%;
    float: left;
    margin: 10px auto;
    margin-bottom: 5px;
    align-self: flex-start;
    word-wrap: break-word; /* 긴 텍스트가 말풍선을 넘어갈 경우 자동으로 줄 바꿈 */
  }
`;

const UserName = styled.div`
  font-size: 17px;
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  // margin-bottom: 20px;
`;

const TimeStampMine = styled.div`
  font-size: 10px;
  float: right;
  clear: both; /* Clear any floats to prevent layout issues */
  margin-right: 20px;
  margin-bottom: 5px;
`;

const TimeStampOther = styled.div`
  font-size: 10px;
  float: left;
  clear: both; /* Clear any floats to prevent layout issues */
  margin-bottom: 10px;
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
//   position: relative;
//   background: #ffffff;
//   border: 1px solid #ddd;
//   font-size: 16px;
//   padding: 10px;
//   border-radius: 10px;
//   max-width: 80%;
//   float: left;
//   margin: 10px auto;
//   align-self: flex-start;
//   word-wrap: break-word; /* 긴 텍스트가 말풍선을 넘어갈 경우 자동으로 줄 바꿈 */
// `;

const StyledChatBtn = styled.button`
  width: 100px;
  height: 41px;
  background: #426b1f;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  border: none;
  cursor: pointer;
  margin: 10px;
  align-self: flex-end; /* 맨 아래에 정렬 */

  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

const DateLine = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 12px;
  margin: 8px 0px;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.15);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

const ChatItem = ({ chatLog, loginUser }) => {
  const { _id, room, user, chat, files, createdAt, translated } = chatLog;
  const roomId = _id;
  return (
    <ChatMessage
      className={
        loginUser.no === user.mno ? 'StyledChatMine' : 'StyledChatOther'
      }
    >
      {chat}
      {translated.map((result) => (
        <span>
          {result.langCode}:{result.txt}
        </span>
      ))}
    </ChatMessage>
  );
};

const ChatComponent = ({
  room,
  chats,
  newChat,
  user,
  onChange,
  chatTxt,
  onSendChat,
  onTranslate,
  targetLanguage,
  setTargetLanguage,
  onLoadBeforeChats,
}) => {
  // const profileUrl = `http://gjoxpfbmymto19010706.cdn.ntruss.com/sns_member/${user.photo}?type=f&w=270&h=270&faceopt=true&ttype=jpg`;
  const messageEndRef = useRef(null);
  const [beforeScrollHeight, setBeforeScrollHeight] = useState(0);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
    }
  }, [newChat]);

  // 날짜를 표시할 변수 초기화
  let currentDate = null;

  return (
    <ChatContainer>
      {room && (
        <TitleStyle>{`🌱 ${room.users[0].nick}, ${room.users[1].nick} 🌱`}</TitleStyle>
      )}

      <select
        onChange={(e) => setTargetLanguage(e.target.value)}
        value={targetLanguage}
      >
        <option value="ko">한국어</option>
        <option value="en">영어</option>
        <option value="ja">일본어</option>
        <option value="zh-CN">중국어 간체</option>
        <option value="zh-TW">중국어 번체</option>
        <option value="vi">베트남어</option>
        <option value="id">인도네시아어</option>
        <option value="th">태국어</option>
        <option value="de">독일어</option>
        <option value="ru">러시아어</option>
        <option value="es">스페인어</option>
        <option value="it">이탈리아어</option>
        <option value="fr">프랑스어</option>
      </select>

      {/* <button onClick={onLoadBeforeChats}>무한 스크롤 테스트용</button> */}
      <StyledChatList
        onScroll={async (e) => {
          const element = e.target;
          if (element.scrollTop === 0) {
            setBeforeScrollHeight(element.scrollHeight);
            await onLoadBeforeChats();
            element.scrollTo({
              top: element.scrollHeight - beforeScrollHeight,
              left: 0,
              behavior: 'instant',
            });
            console.log(element.scrollHeight - beforeScrollHeight);
          }
        }}
      >
        <ChatMessage>
          {chats &&
            chats.map((chatLog, index) => {
              // 현재 메시지 날짜
              const messageDate = new Date(
                chatLog.createdAt
              ).toLocaleDateString();

              // 날짜 변화 체크
              const isDateChanged = currentDate !== messageDate;

              // 현재 날짜 업데이트
              currentDate = messageDate;

              return (
                <div key={chatLog._id}>
                  {isDateChanged && (
                    <div>
                      {/* 날짜가 바뀌었을 때 구분선과 날짜를 표시 */}
                      <br />
                      <DateLine>{messageDate}</DateLine>
                      <br />
                    </div>
                  )}

                  {/* 나머지 채팅 메시지 표시 */}
                  <div>
                    <div>
                      {user.no !== chatLog.user.mno && (
                        <UserName className={'UserName'}>
                          <UserImage
                            src={
                              chatLog.user.photo
                                ? `https://kr.object.ncloudstorage.com/bitcamp-nc7-bucket-14/sns_member/${chatLog.user.photo}`
                                : 'images/default.jpg'
                            }
                          />
                          {`${chatLog.user.nick}`}
                        </UserName>
                      )}
                    </div>
                    <div>
                      <ChatItem chatLog={chatLog} loginUser={user} />
                      {user.no !== chatLog.user.mno && (
                        <TimeStampOther>{`${new Date(
                          chatLog.createdAt
                        ).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}`}</TimeStampOther>
                      )}
                      {user.no === chatLog.user.mno && (
                        <TimeStampMine>{`${new Date(
                          chatLog.createdAt
                        ).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}`}</TimeStampMine>
                      )}
                    </div>
                    <div>
                      {user.no !== chatLog.user.mno && (
                        <div>
                          <button onClick={(e) => onTranslate(chatLog)}>
                            번역
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          <div ref={messageEndRef}></div> {/* Scroll to this div */}
        </ChatMessage>
      </StyledChatList>
      <SendChatBlock>
        <StyledSubmitForm onSubmit={onSendChat}>
          <StyledInput
            type="text"
            onChange={onChange}
            value={chatTxt}
            name="chatTxt"
            className="inputChatTxt"
            placeholder="메시지를 입력하세요"
          />
          {/* <StyledInput
            type="file"
            onChange={onChangeFile}
            accept="image/*"
            ref={inputFile}
            className="inputFile"
          /> */}
          <StyledChatBtn type="submit">보내기</StyledChatBtn>
        </StyledSubmitForm>
      </SendChatBlock>
    </ChatContainer>
  );
};

export default ChatComponent;
