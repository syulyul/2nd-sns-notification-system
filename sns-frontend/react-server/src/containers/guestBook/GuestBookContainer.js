import React, { useState } from 'react';
import GuestBookComponent from '../../components/guestBook/GuestBookComponent';

const GuestBookContainer = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [guestBookList] = useState([
    {
      no: 1,
      title: '방명록제목1',
      content: '방명록내용1',
      createdAt: '2023-10-04 14:30:00',
      writer: {
        no: 1,
        nick: 'User1',
        photo: null,
      },
    },
    {
      no: 2,
      title: '방명록제목2',
      content: '방명록내용2',
      createdAt: '2023-10-04 15:45:00',
      writer: {
        no: 2,
        nick: 'User2',
        photo: null,
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