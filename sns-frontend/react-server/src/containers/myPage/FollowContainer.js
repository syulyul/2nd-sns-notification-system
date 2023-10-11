import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FollowComponent from '../../components/myPage/FollowComponent';
import { following, follower } from '../../modules/myPage';
import { follow, unfollow } from '../../modules/auth';

const FollowContainer = () => {
  const dispatch = useDispatch();

  const { user, followList, error, userNo, followMemberSet } = useSelector(
    ({ auth, myPage }) => ({
      user: auth.user,
      followList: myPage.followList,
      error: myPage.error,
      userNo: myPage.userNo,
      followMemberSet: auth.followList,
    })
  );

  useEffect(() => {
    dispatch(following(userNo));
  }, [dispatch, userNo]); // 팔로우 버튼 클릭 시 실행되는 함수

  const handleFollow = (myPagNo) => {
    dispatch(follow(myPagNo));
  };
  const handleUnfollow = (myPagNo) => {
    dispatch(unfollow(myPagNo));
  };

  // 에러가 발생하면 에러 메시지를 출력합니다.
  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  return (
    <FollowComponent
      user={user}
      followMemberSet={followMemberSet}
      followListData={followList}
      handleFollow={handleFollow}
      handleUnfollow={handleUnfollow}
    />
  );
};

export default FollowContainer;
