import MemberInfoUpdateContainer from '../containers/myPage/MemberInfoUpdateContainer';
import HeaderContainer from "../containers/common/HeaderContainer";
import SearchUserContainer from "../containers/myPage/SearchUserContainer";
import MemberInfoContainer from "../containers/myPage/MemberInfoContainer";

const MemberInfoUpdatePage = () => {
  return    <>
    <HeaderContainer />

    <MemberInfoContainer />

    <div style={{ marginLeft: '600px', marginBottom: '30px', marginTop: '-20px'}}>
      <MemberInfoUpdateContainer />
    </div>  </>
};

export default MemberInfoUpdatePage;