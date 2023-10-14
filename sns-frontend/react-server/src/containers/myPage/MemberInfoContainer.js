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
import { follow, unfollow } from '../../modules/auth';

const MemberInfoContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userNo } = useParams();
  const [error, setError] = useState(null);

  const { myPage, myPageError, user, followMemberSet } = useSelector(
    ({ auth, myPage }) => ({
      myPage: myPage.myPage,
      myPageError: myPage.myPageError,
      user: auth.user,
      followMemberSet: auth.followList,
    })
  );

  //컴포넌트 초기 렌터링 때 form 초기화
  useEffect(() => {
    dispatch(info(userNo));
  }, [dispatch, userNo]);

  // 에러가 발생하면 에러 메시지를 출력합니다.
  if (myPageError) {
    return <div>오류가 발생했습니다: {myPageError.message}</div>;
  }
  const onFollowingList = (e) => {
    e.preventDefault();
    dispatch(following(userNo));
  };
  const onFollowerList = (e) => {
    e.preventDefault();
    dispatch(follower(userNo));
  };

  const handleFollow = (myPagNo) => {
    dispatch(follow(myPagNo));
  };
  const handleUnfollow = (myPagNo) => {
    dispatch(unfollow(myPagNo));
  };

  return (
    <MemberInfoComponent
      onFollowerList={onFollowerList}
      onFollowingList={onFollowingList}
      followMemberSet={followMemberSet}
      handleFollow={handleFollow}
      handleUnfollow={handleUnfollow}
      myPageData={myPage}
      user={user}
    />
  );
};

export default MemberInfoContainer;
