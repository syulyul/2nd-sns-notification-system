import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BoardDetailComponent from '../../components/board/BoardDetailComponent';
import { detail } from '../../modules/board';

const BoardDetailContainer = () => {
  const dispatch = useDispatch();
  // const { board, boardError } = useSelector(state => state.board);

  const boardDefault = {
    title: 'Loading...',
    content: 'Loading...',
    writer: {
      nick: 'Loading...'
    },
    attachedFiles: [],
    editable: false,
    liked: false,
    viewCount: 0,
    createdAt: new Date().toISOString()
  };

  const commentDefault = {
    content: 'Loading...',
    writer: {
      nick: 'Loading...'
    },
    createdAt: new Date().toISOString()
  };

  const { board = boardDefault, comments = Array(5).fill(commentDefault), boardError }  = useSelector(state => ({
    board: state.board.board,
    comments: state.board.comments,
    boardError: state.board.boardError
  }));

  const { boardNo, category } = useParams();

  useEffect(() => {
    dispatch(detail({ category, boardNo }));
  }, [dispatch, category, boardNo]);

  if (boardError) {
    return <div>Error occurred: {boardError.message}</div>;
  }

  return <BoardDetailComponent
      board={board}
      comments={comments}
  />;
};

export default BoardDetailContainer;
