import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardListComponent from '../../components/board/BoardListComponent';
import { list } from '../../modules/board';
import qs from 'qs';
import { useLocation, useParams } from 'react-router-dom';

const BoardListContainer = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();

  // redux store에서 게시글 목록 데이터와 에러 정보를 가져옵니다.
  const { boardList, error, category, lastPage, board } = useSelector(({ board }) => ({
    boardList: board.boardList,
    error: board.boardError,
    category: board.category,
    lastPage: board.lastPage,
    board: board.board,
  }));

  const { limit = 10, page = 1 } = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

  // 컴포넌트가 마운트될 때 게시글 목록을 요청합니다.
  useEffect(() => {
    dispatch(list({ category, limit, page }));
  }, [dispatch, category, limit, page, board]);

  // 에러가 발생하면 에러 메시지를 출력합니다.
  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  return <BoardListComponent
      boardListData={boardList}
      page={page}
      query={query}
      lastPage={lastPage}
  />
};

export default BoardListContainer;