import MemberInfoUpdateContainer from '../containers/myPage/MemberInfoUpdateContainer';
import HeaderContainer from "../containers/common/HeaderContainer";
import SearchUserContainer from "../containers/myPage/SearchUserContainer";
import MemberInfoContainer from "../containers/myPage/MemberInfoContainer";
import FooterContainer from '../containers/common/FooterContainer';


const MemberInfoUpdatePage = () => {
  return    <>
    <HeaderContainer />

    <MemberInfoContainer />

    <div style={{ marginLeft: '480px', marginBottom: '30px'}}>
      <MemberInfoUpdateContainer />
    </div>
    <FooterContainer />
  </>
};

export default MemberInfoUpdatePage;