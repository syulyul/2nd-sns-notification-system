import React, { useState } from 'react';
import FollowComponent from "../../components/myPage/FollowComponent";
import defaultImage from '../../images/default.jpg';

const FollowContainer = () => {
  // 임시 회원 목록
  const followList = [
    { no: 1, nick: '지나가율', photo: defaultImage },
    { no: 2, nick: '연궁이', photo: defaultImage },
    { no: 3, nick: '산준으로', photo: defaultImage }
  ];

  // 임시 세션 데이터
  const session = {
    loginUser: {
      followMemberSet: [2]
    }
  };

  return (
      <FollowComponent
          followList={followList}
          session={session}
      />
  );
};

export default FollowContainer;