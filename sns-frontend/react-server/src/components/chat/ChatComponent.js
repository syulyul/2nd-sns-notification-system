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

const LanguageSelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-top: 10px;
`;

const FlagIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;
  border: ${(props) => (props.selected ? '2px solid #007bff' : 'none')};
`;

const LanguageAbbreviation = styled.span`
  font-size: 12px;
`;

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

const TranslateText = styled.span`
  color: blue;
  cursor: pointer;
  margin-top: 100000px; /* 번역 버튼을 아래로 내리기 */
`;

const TranslateButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px; /* 번역 버튼을 상단에서 하단으로 이동 */
`;

const ChatItem = ({ chatLog, loginUser, targetLanguage}) => {
  const { _id, room, user, chat, files, createdAt, translated } = chatLog;
  const roomId = _id;
  return (
    <ChatMessage
      className={
        loginUser.no === user.mno ? 'StyledChatMine' : 'StyledChatOther'
      }
    >
      {chat}
      {translated.map((result) => {
        if (result.langCode === targetLanguage) {
          return (
              <span key={result.langCode}>
        ({result.txt})
      </span>
          );
        }
        return null; // 조건을 만족하지 않으면 null 반환
      })}
        </ChatMessage>
        );
      };

const LanguageOptions = [
  { value: 'ko', label: '한국어', flag: '/images/ko.png', abbreviation: 'KO' },
  { value: 'en', label: '영어', flag: '/images/en.png', abbreviation: 'EN' },
  { value: 'ja', label: '일본어', flag: '/images/ja.png', abbreviation: 'JA' },
  { value: 'zh-CN', label: '중국어 간체', flag: '/images/zh-CN.png', abbreviation: 'CN' },
  { value: 'zh-TW', label: '중국어 번체', flag: '/images/zh-TW.png', abbreviation: 'TW' },
  { value: 'vi', label: '베트남어', flag: '/images/vi.png', abbreviation: 'VI' },
  { value: 'id', label: '인도네시아어', flag: '/images/id.png', abbreviation: 'ID' },
  { value: 'th', label: '태국어', flag: '/images/th.png', abbreviation: 'TH' },
  { value: 'de', label: '독일어', flag: '/images/de.png', abbreviation: 'DE' },
  { value: 'ru', label: '러시아어', flag: '/images/ru.png', abbreviation: 'RU' },
  { value: 'es', label: '스페인어', flag: '/images/es.png', abbreviation: 'ES' },
  { value: 'it', label: '이탈리아어', flag: '/images/it.png', abbreviation: 'IT' },
  { value: 'fr', label: '프랑스어', flag: '/images/fr.png', abbreviation: 'FR' },
];


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
      <LanguageSelectContainer>
        {LanguageOptions.map((option) => (
        <div key={option.value}> {/* 각 요소를 div 등의 요소로 감싸기 */}
          <LanguageAbbreviation>{option.abbreviation}</LanguageAbbreviation>
          <FlagIcon
              src={option.flag}
              alt={option.label}
              selected={option.value === targetLanguage}
              onClick={() => setTargetLanguage(option.value)}
          />
        </div>
        ))}
      </LanguageSelectContainer>

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
          {chats && chats.map((chatLog, index) => {
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
                      <ChatItem chatLog={chatLog} loginUser={user} targetLanguage={targetLanguage} />
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
                            <TranslateText onClick={(e) => onTranslate(chatLog)}>
                              <img src="/images/tricon.png" alt="번역" />
                            </TranslateText>
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
