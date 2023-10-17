import ChatContainer from '../containers/chat/ChatContainer';
import HeaderContainer from "../containers/common/HeaderContainer";
import ChatRoomListContainer from "../containers/chat/ChatRoomListContainer"

const ChatPage = () => {

  return (
      <>
        <HeaderContainer />
        <div style={{ display: 'flex', marginTop:'-100px'}}>
          <ChatRoomListContainer />
          <ChatContainer />
        </div>
      </>
  );
};

export default ChatPage;