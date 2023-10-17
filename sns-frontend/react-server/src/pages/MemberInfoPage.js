import MemberInfoContainer from '../containers/myPage/MemberInfoContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import FollowContainer from '../containers/myPage/FollowContainer';
import PageDetailContainer from '../containers/myPage/PageDetailContainer';
import SearchUserContainer from '../containers/myPage/SearchUserContainer';


const MemberInfoPage = () => {
  return (
    <>
      <HeaderContainer />
      <div style={{ marginLeft: '30px', marginBottom: '30px', marginTop: '-20px'}}>
        <SearchUserContainer />
      </div>
      <MemberInfoContainer />

      <PageDetailContainer />
      <FollowContainer />
    </>
  );
};

export default MemberInfoPage;
