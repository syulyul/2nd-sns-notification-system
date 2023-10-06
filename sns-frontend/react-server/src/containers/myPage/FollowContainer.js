import React, { useState } from 'react';
import FollowComponent from '../../components/myPage/FollowComponent';

const FollowContainer = () => {
  const defaultImage = process.env.PUBLIC_URL + '/images/default.jpg';
  // 임시 회원 목록
  const followList = [
    { no: 1, nick: '지나가율', photo: defaultImage },
    { no: 2, nick: '연궁이', photo: defaultImage },
    { no: 3, nick: '산준으로', photo: defaultImage },
  ];

  // 임시 세션 데이터
  const session = {
    loginUser: {
      followMemberSet: [2],
    },
  };

  return <FollowComponent followList={followList} session={session} />;
};

export default FollowContainer;
