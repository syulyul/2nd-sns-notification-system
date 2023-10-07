// MemberInfoContainer에서 수정
import React, { useEffect } from 'react';
import MemberInfoComponent from '../../components/myPage/MemberInfoComponent';
import { useSelector, useDispatch } from 'react-redux';
import * as myPageModule from '../../modules/mypage';

const MemberInfoContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => ({
    user: auth.user,
  }));

  useEffect(() => {
    // user 정보가 변경될 때마다 실행되도록 useEffect를 사용합니다.
    if (user) {
      dispatch(myPageModule.exampleAction({ arg1: user.no })); // 예시로 exampleAction을 디스패치
    }
  }, [user, dispatch]);

  return <MemberInfoComponent user={user} />;
};

export default MemberInfoContainer;