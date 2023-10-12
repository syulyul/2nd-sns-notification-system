import React, { useState } from 'react';
import PageDetailComponent from '../../components/myPage/PageDetailComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { list } from '../../modules/myPage';
import { useNavigate, useParams } from 'react-router-dom';

const PageDetailContainer = () => {
  const dispatch = useDispatch();
  const { myBoardList, myCommentList, show } = useSelector(({ myPage }) => ({
    myBoardList: myPage.myBoardList,
    myCommentList: myPage.myCommentList,
    show: myPage.show,
  }));

  const { userNo } = useParams();

  //컴포넌트 초기 렌터링 때 form 초기화
  useEffect(() => {
    dispatch(list(userNo));
  }, [dispatch, userNo]);

  const onSubmitSearch = () => {};

  return (
    <PageDetailComponent
      onSubmitSearch={onSubmitSearch}
      show={show}
      myBoardList={myBoardList}
      myCommentList={myCommentList}
    />
  );
};

export default PageDetailContainer;
