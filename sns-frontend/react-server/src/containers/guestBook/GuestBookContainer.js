import React, { useEffect } from 'react';
import GuestBookComponent from '../../components/guestBook/GuestBookComponent';
import {
  changeField,
  initializeForm,
  list,
  deleteGuestBook,
  post
} from '../../modules/guestBook';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

const GuestBookContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{ no } = useParams();

  const { guestBookList, error, mpno, guestBookOwnerNick, title, content, writer, guestBook } = useSelector(
      ({ auth, guestBook }) => ({
        guestBookList: guestBook.guestBookList,
        error: guestBook.guestBookError,
        guestBookOwnerNick: guestBook.guestBookOwnerNick,
        title: guestBook.title,
        content: guestBook.content,
        writer: auth.user,
        mpno: no,
        guestBook: guestBook.guestBook,
      }));

  useEffect(() => {
    if (no) {
      dispatch(list(no)); // no가 유효한 경우에만 요청을 보냅니다.
      navigate(`/guestBook/${no}`);
    }
  }, [dispatch, no, guestBook]);

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
        changeField({
          key: name,
          value,
        })
    );
  };

  const onSubmit =  (e) => {
    e.preventDefault();
    dispatch(post({ mpno, title, content, writer }));
    dispatch(initializeForm());
  };

  const onDelete =  (e, guestBookNo) => {
    e.preventDefault();
    dispatch(deleteGuestBook(guestBookNo));
  };

  return (
      <GuestBookComponent
          title={title}
          content={content}
          onChange={onChange}
          onSubmit={onSubmit}
          onDelete={onDelete}
          guestBookList={guestBookList}
          guestBook={guestBook}
          guestBookOwnerNick={guestBookOwnerNick}
          mpno={no}
      />
  );
};

export default GuestBookContainer;