import React, {useEffect, useState} from 'react';
import GuestBookComponent from '../../components/guestBook/GuestBookComponent';
import guestBook, {changeField, list, post} from "../../modules/guestBook";
import {useDispatch, useSelector} from "react-redux";
import auth from "../../modules/auth";
import myPage from "../../modules/myPage";
import { useNavigate, useParams } from 'react-router-dom';

const GuestBookContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{ no} = useParams();

  const { guestBookList, error, mpno, mno, guestBookOwnerNick, title, content} = useSelector(
      ({auth, guestBook, myPage}) => ({
        guestBookList: guestBook.guestBookList,
        error: guestBook.guestBookError,
        guestBookOwnerNick: guestBook.guestBookOwnerNick,
        title: guestBook.title,
        content: guestBook.content,
        mpno: no,
        mno: auth.user.no,
      }));

  useEffect(() => {
    if (no) {
      dispatch(list(no)); // no가 유효한 경우에만 요청을 보냅니다.
      navigate(`/guestBook/${no}`);
    }
  }, [dispatch, no]);

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
        changeField({
          key: name,
          value,
        })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(post({ mno, mpno, title, content}));
  };

  return (
      <GuestBookComponent
          title={title}
          content={content}
          onChange={onChange}
          onSubmit={onSubmit}
          guestBookList={guestBookList}
          guestBookOwnerNick={guestBookOwnerNick}
          mpno={no}
          mno={mno}
      />
  );
};

export default GuestBookContainer;