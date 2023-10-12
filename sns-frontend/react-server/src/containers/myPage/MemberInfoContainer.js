import React, { useEffect, useState } from 'react';
import MemberInfoComponent from '../../components/myPage/MemberInfoComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  list,
  following,
  follower,
  initializeForm,
  info,
} from '../../modules/myPage';
import { useNavigate, useParams } from 'react-router-dom';

const MemberInfoContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userNo } = useParams();
  const [error, setError] = useState(null);

  const { myPage, myPageError, user } = useSelector(({ auth, myPage }) => ({
    myPage: myPage.myPage,
    myPageError: myPage.myPageError,
    user: auth.user,
  }));

  //컴포넌트 초기 렌터링 때 form 초기화
  useEffect(() => {
    dispatch(list(userNo));
    dispatch(info(userNo));
  }, [dispatch, userNo]);

  // 에러가 발생하면 에러 메시지를 출력합니다.
  if (myPageError) {
    return <div>오류가 발생했습니다: {myPageError.message}</div>;
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(following(userNo));
    dispatch(list(userNo));
    dispatch(initializeForm());
    navigate(`/myPage/${user.no}?show=followings`);
  };
  const onSubmit2 = (e) => {
    e.preventDefault();
    dispatch(follower(userNo));
    dispatch(list(userNo));
    dispatch(initializeForm());
    navigate(`/myPage/${user.no}?show=follower`);
  };

  return (
    <MemberInfoComponent
      onSubmit2={onSubmit2}
      onSubmit={onSubmit}
      follow={userNo}
      myPageData={myPage}
      user={user}
    />
  );
};

export default MemberInfoContainer;
