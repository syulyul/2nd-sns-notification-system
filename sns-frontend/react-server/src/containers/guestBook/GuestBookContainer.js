import React, {useEffect, useState} from 'react';
import GuestBookComponent from '../../components/guestBook/GuestBookComponent';
import guestBook, {list} from "../../modules/guestBook";
import {useDispatch, useSelector} from "react-redux";

const GuestBookContainer = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { guestBookList, error, userNo, guestBookOwnerNick} = useSelector(
      ({auth, guestBook}) => ({
        guestBookList: guestBook.guestBookList,
        error: guestBook.guestBookError,
        guestBookOwnerNick: guestBook.guestBookOwnerNick,
        userNo: auth.user.no,
      }));

  useEffect(() => {
    dispatch(list(userNo));
  }, [dispatch, userNo]);

  const handleChange = (e) => {
    const {name, value} = e.target;

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
          guestBookOwnerNick={guestBookOwnerNick}
      />
  );
};

export default GuestBookContainer;