import {useDispatch, useSelector} from 'react-redux';
import MemberInfoComponent from '../../components/myPage/MemberInfoComponent';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
const MemberInfoContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { user, page, no, visitCount, stateMessage } = useSelector(({ auth, myPage }) => ({
    user: auth.user,
    page: myPage.page,
    no: myPage.no,
    visitCount: myPage.visitCount,
    stateMessage: myPage.stateMessage,
  }));

  return (
      <MemberInfoComponent
          stateMessage={stateMessage}
          user={user}
          page={page}
          no={no}
          visitCount={visitCount}
      />
  );
};

export default MemberInfoContainer;