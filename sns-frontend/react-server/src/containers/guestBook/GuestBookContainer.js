import React, { useState } from 'react';
import GuestBookComponent from '../../components/guestBook/GuestBookComponent';

const GuestBookContainer = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [guestBookList] = useState([
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'content') {
      setContent(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle('');
    setContent('');
  };

  return (
      <GuestBookComponent
          title={title}
          content={content}
          onChange={handleChange}
          onSubmit={handleSubmit}
          guestBookList={guestBookList}
      />
  );
};

export default GuestBookContainer;