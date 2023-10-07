import {useDispatch, useSelector} from 'react-redux';
import MemberInfoComponent from '../../components/myPage/MemberInfoComponent';
import { changeField, initializeForm, info } from '../../modules/myPage';
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

  useEffect(() => {
    info(initializeForm());
  }, [dispatch]);

  useEffect(() => {
    if (Error) {
      console.log('오류 발생');
      console.log(Error);
      Error('로그인 실패');
      return;
    }
    if (user) {
      console.log('로그인 성공');
      console.log(user);
      // navigate(`/`);
      navigate(`/myPage/${user.no}`);
    }
  }, [user, Error, dispatch]);

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