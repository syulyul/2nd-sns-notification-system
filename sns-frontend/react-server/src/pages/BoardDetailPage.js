import BoardDetailContainer from '../containers/board/BoardDetailContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import BoardListContainer from '../containers/board/BoardListContainer';
import FooterContainer from '../containers/common/FooterContainer';

const BoardDetailPage = () => {
  return (
    <>
      <HeaderContainer />
      <BoardDetailContainer />
      <FooterContainer />
    </>
  );
};

export default BoardDetailPage;