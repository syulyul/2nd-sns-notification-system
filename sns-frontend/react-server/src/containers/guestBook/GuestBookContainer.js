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
import { guestBooklike, guestBookunlike } from '../../modules/auth';

const GuestBookContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{ no } = useParams();
  const guestBookNo = no;

  const { guestBookList, error, mpno, guestBookOwnerNick, title, content, writer, guestBook, likeGuestBookSet } = useSelector(
      ({ auth, guestBook }) => ({
        guestBookList: guestBook.guestBookList,
        error: guestBook.guestBookError,
        guestBookOwnerNick: guestBook.guestBookOwnerNick,
        title: guestBook.title,
        content: guestBook.content,
        writer: auth.user,
        mpno: no,
        guestBook: guestBook.guestBook,
        likeGuestBookSet : auth.likeGuestBookList,
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

  const handleLike = (guestBookNo) => {
    console.log("handlelike called with:", guestBookNo);
    dispatch(guestBooklike(guestBookNo));
  };
  const handleUnlike = (guestBookNo) => {
    console.log("handleUnlike called with:", guestBookNo);
    dispatch(guestBookunlike(guestBookNo));
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
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          likeGuestBookSet={likeGuestBookSet}
      />
  );
};

export default GuestBookContainer;