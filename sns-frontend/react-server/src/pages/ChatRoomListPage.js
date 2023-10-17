import ChatRoomListContainer from "../containers/chat/ChatRoomListContainer";
import HeaderContainer from "../containers/common/HeaderContainer";
import FooterContainer from '../containers/common/FooterContainer';
const ChatRoomListPage = () => {
  return (
      <>
        <HeaderContainer />
        <ChatRoomListContainer />
        <FooterContainer />
      </>
  );
};

export default ChatRoomListPage;