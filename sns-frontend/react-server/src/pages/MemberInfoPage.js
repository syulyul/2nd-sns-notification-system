import MemberInfoContainer from '../containers/myPage/MemberInfoContainer';
import HeaderContainer from "../containers/common/HeaderContainer";
import FollowContainer from "../containers/myPage/FollowContainer";
import PageDetailContainer from "../containers/myPage/PageDetailContainer";

const MemberInfoPage = () => {
  return(
      <>
        <HeaderContainer />
        <MemberInfoContainer />
        <PageDetailContainer />
        <FollowContainer />
      </>
  )};

export default MemberInfoPage;