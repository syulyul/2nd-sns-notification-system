import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FollowComponent from '../../components/myPage/FollowComponent';
import { follow, unfollow } from "../../modules/myPage"; // 모듈에서 follow, unfollow 액션 불러오기

const FollowContainer = () => {
  const defaultImage = process.env.PUBLIC_URL + '/images/default.jpg';

  const {followList, session} = useSelector(({myPage}) => ({
    followList: myPage.followList,
    session: myPage.session,
  }));


  // 팔로우한 회원 목록과 언팔로우한 회원 목록을 상태로 관리
  const [followingList, setFollowingList] = useState(session.loginUser.followMemberSet);

  // useDispatch를 사용하여 액션을 디스패치할 수 있도록 설정
  const dispatch = useDispatch();

  // 팔로우 버튼 클릭 시 실행되는 함수
  const handleFollow = (memberNo) => {
    // follow 액션을 디스패치하여 서버에 팔로우 요청을 보냄
    dispatch(follow(memberNo));
    // 팔로우한 회원 목록에 추가
    setFollowingList([...followingList, memberNo]);
  };

  // 언팔로우 버튼 클릭 시 실행되는 함수
  const handleUnfollow = (memberNo) => {
    // unfollow 액션을 디스패치하여 서버에 언팔로우 요청을 보냄
    dispatch(unfollow(memberNo));
    // 언팔로우한 회원 목록에서 제거
    setFollowingList(followingList.filter((no) => no !== memberNo));
  };

  return (
      <FollowComponent
          followList={followList}
          session={session}
          followingList={followingList}
          handleFollow={handleFollow}
          handleUnfollow={handleUnfollow}
      />
  );
};

export default FollowContainer;