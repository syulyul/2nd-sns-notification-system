import React, { useState } from 'react';
import MemberInfoUpdateComponent from '../../components/myPage/MemberInfoUpdateComponent';
import defaultImage from '../../images/default.jpg';

const MemberInfoUpdateContainer = () => {
  // 임시 데이터
  const [myPageData, setMyPageData] = useState({
    photo: defaultImage, // 임시 이미지 경로
    name: "Sample Name", // 임시 이름
    nick: "Sample Nickname", // 임시 닉네임
    birthday: "2000-01-01", // 임시 생일
    email: "sample@email.com", // 임시 이메일
    phoneNumber: "010-1234-5678", // 임시 전화번호
    password: "samplePassword", // 임시 암호
    gender: "1", // 임시 성별 (1: 남자, 2: 여자)
    no: 1 // 임시 번호
  });
  //
  // // 이미지 변경 이벤트 핸들러
  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setMyPageData(prev => ({ ...prev, photo: event.target.result }));
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };
  //
  // // 폼 제출 이벤트 핸들러
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Updated data:", myPageData);
  // };

  return (
      <MemberInfoUpdateComponent
          myPageData={myPageData}
          // handleImageChange={handleImageChange}
          // handleSubmit={handleSubmit}
      />
  );
};

export default MemberInfoUpdateContainer;