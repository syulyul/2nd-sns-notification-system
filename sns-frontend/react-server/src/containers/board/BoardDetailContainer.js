import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BoardDetailComponent from '../../components/board/BoardDetailComponent';
import { detail } from '../../modules/board';

const BoardDetailContainer = () => {
  const dispatch = useDispatch();
  // const { board, boardError } = useSelector(state => state.board);

  const { board = {}, boardError } = useSelector((state) => ({
    board: state.board.board,
    boardError: state.board.boardError,
  }));

  const { boardNo, category } = useParams();

  useEffect(() => {
    dispatch(detail({ category, boardNo }));
  }, [dispatch, category, boardNo]);

  if (boardError) {
    return <div>Error occurred: {boardError.message}</div>;
  }

  return <BoardDetailComponent board={board} />;
};

export default BoardDetailContainer;
