import React, { useState } from 'react';
import MemberInfoComponent from '../../components/myPage/MemberInfoComponent';
import defaultImage from '../../images/default.jpg';

const MemberInfoContainer = () => {
  // 임시 데이터
  const [myPageData, setMyPageData] = useState({
    visitCount: 1234, // 임시 데이터
    photo: defaultImage, // 임시 이미지 경로
    nick: "연궁이", // 임시 닉네임
    stateMessage: "하이하이", // 임시 상태 메시지
    no: 1 // 임시 번호
  });


  return <MemberInfoComponent myPageData={myPageData} />;
};

export default MemberInfoContainer;