import BoardFormContainer from '../containers/board/BoardFormContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import FooterContainer from '../containers/common/FooterContainer';

const BoardFormPage = () => {
  
  return(
      <>
        <HeaderContainer />
        <BoardFormContainer />
        <FooterContainer />
      </>
  );
};

export default BoardFormPage;