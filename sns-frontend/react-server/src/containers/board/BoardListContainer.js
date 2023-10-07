import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardListComponent from '../../components/board/BoardListComponent';
import { list } from '../../modules/board';

const BoardListContainer = () => {
  const dispatch = useDispatch();

  // redux store에서 게시글 목록 데이터와 에러 정보를 가져옵니다.
  const { boardList, error, category } = useSelector(({ board }) => ({
    boardList: board.boardList,
    error: board.boardError,
    category: board.category,
  }));

  // 컴포넌트가 마운트될 때 게시글 목록을 요청합니다.
  useEffect(() => {
    dispatch(list(category));
  }, [dispatch, category]);

  // 에러가 발생하면 에러 메시지를 출력합니다.
  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  return <BoardListComponent boardListData={boardList} />
};

export default BoardListContainer;