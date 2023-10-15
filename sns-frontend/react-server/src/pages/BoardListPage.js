import BoardListContainer from '../containers/board/BoardListContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import SearchBoardContainer from '../containers/board/SearchBoardContainer';

const BoardListPage = () => {
  return (
    <>
      <HeaderContainer />
      <SearchBoardContainer/>
      <BoardListContainer />
    </>
  );
};

export default BoardListPage;