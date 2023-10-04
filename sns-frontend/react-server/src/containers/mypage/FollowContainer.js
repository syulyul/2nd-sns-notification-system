import React, { useState } from 'react';
import FollowComponent from "../../components/mypage/FollowComponent";

      const FollowContainer = () => {
  const [myPageList2, setPageDetailList] = useState([
    {
      no: 1,
      title: '첫 번째 게시글',
      content: '안녕하세요. 첫 번째 게시글입니다.',
      createdAt: '2023-10-04 14:30:00',
      writer: {
        no: 1,
        nick: 'User1',
        photo: 'user1.jpg',
      },
    },
    {
      no: 2,
      title: '두 번째 게시글',
      content: '두 번째 게시글 내용입니다.',
      createdAt: '2023-10-04 15:45:00',
      writer: {
        no: 2,
        nick: 'User2',
        photo: 'user2.jpg',
      },
    },
  ]);

  return (<FollowComponent myPageList2={myPageList2} />);
};

export default FollowContainer;