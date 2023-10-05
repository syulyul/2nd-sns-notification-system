import React, { useState } from 'react';
import MemberInfoComponent from '../../components/myPage/MemberInfoComponent';

const MemberInfoContainer = () => {
  // 임시 데이터
  const [myPageData, setMyPageData] = useState({
    visitCount: 1234,
    photo: "/images/default.jpg",
    nick: "Nickname",
    stateMessage: "상태메세지 예시",
    no: 1
  });


  return <MemberInfoComponent myPageData={myPageData} />;
};

export default MemberInfoContainer;