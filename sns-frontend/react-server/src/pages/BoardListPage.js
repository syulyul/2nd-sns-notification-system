import BoardListContainer from '../containers/board/BoardListContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import SearchBoardContainer from '../containers/board/SearchBoardContainer';
import FooterContainer from '../containers/common/FooterContainer';

const BoardListPage = () => {
  return (
    <>
      <HeaderContainer />
      <BoardListContainer />
      <FooterContainer />
    </>
  );
};

export default BoardListPage;