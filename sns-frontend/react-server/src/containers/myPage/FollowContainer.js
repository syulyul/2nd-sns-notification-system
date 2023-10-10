import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FollowComponent from '../../components/myPage/FollowComponent';
import { follow, unfollow } from "../../modules/myPage";

const FollowContainer = () => {

  const dispatch = useDispatch();

  const {followList, error, followingNo} = useSelector(({myPage}) => ({
    followList: myPage.followList,
    error: myPage.error,
    followingNo: myPage.followingNo
  }));

  useEffect(() => {
    dispatch(follow(followingNo));
  }, [dispatch, followingNo]);  // 팔로우 버튼 클릭 시 실행되는 함수

  // 에러가 발생하면 에러 메시지를 출력합니다.
  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  return (
      <FollowComponent
          followListData={followList}
      />
  );
};

export default FollowContainer;