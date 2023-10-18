import React, { useEffect } from 'react';
import GuestBookComponent from '../../components/guestBook/GuestBookComponent';
import {
  changeField,
  initializeForm,
  list,
  deleteGuestBook,
  post,
} from '../../modules/guestBook';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { guestBooklike, guestBookunlike } from '../../modules/auth';
import qs from 'qs';

const GuestBookContainer = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const { no } = useParams();
  const guestBookNo = no;

  const {
    guestBookList,
    error,
    mpno,
    guestBookOwnerNick,
    title,
    content,
    writer,
    guestBook,
    likeGuestBookSet,
    lastPage,
    user,
    guestBookChangeState,
  } = useSelector(({ auth, guestBook }) => ({
    guestBookList: guestBook.guestBookList,
    error: guestBook.guestBookError,
    guestBookOwnerNick: guestBook.guestBookOwnerNick,
    title: guestBook.title,
    content: guestBook.content,
    writer: auth.user,
    user: auth.user,
    mpno: no,
    guestBook: guestBook.guestBook,
    likeGuestBookSet: auth.likeGuestBookList,
    lastPage: guestBook.lastPage,
    guestBookChangeState: guestBook.guestBookChangeState,
  }));

  const { limit = 10, page = 1 } = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

  // 방명록 리스트를 불러오는 useEffect
  useEffect(() => {
    dispatch(list({ no, limit, page }));
  }, [dispatch, no, limit, page, guestBookChangeState]);

  // URL의 no가 변경되었을 때 페이지 이동을 위한 useEffect
  useEffect(() => {
    navigate(`/guestBook/${no}`);
  }, [no, navigate]);

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
    dispatch(initializeForm());
    dispatch(post({ mpno, title, content, writer }));
  };

  const onDelete = (e, guestBookNo) => {
    e.preventDefault();
    dispatch(deleteGuestBook(guestBookNo));
  };

  const handleLike = (guestBookNo) => {
    console.log('handlelike called with:', guestBookNo);
    dispatch(guestBooklike(guestBookNo));
  };
  const handleUnlike = (guestBookNo) => {
    console.log('handleUnlike called with:', guestBookNo);
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
      page={page}
      query={query}
      lastPage={lastPage}
      user={user}
    />
  );
};

export default GuestBookContainer;
