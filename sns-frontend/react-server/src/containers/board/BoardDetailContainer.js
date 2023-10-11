import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate  } from 'react-router-dom';
import BoardDetailComponent from '../../components/board/BoardDetailComponent';
import { changeField, initializeForm, detail, addComment, deleteBoard } from '../../modules/board';

const BoardDetailContainer = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const navigate = useNavigate();

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

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      boardNo: parseInt(boardNo, 10),
      content
    };
    dispatch(addComment(commentData));
    setContent('');  // 입력 필드 초기화
  };

  const onEdit = () => {
    const updatedBoard = { ...board, editable: true };

  };

  const onReset = () => {
    dispatch(detail({ category, boardNo }));
  };

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteBoard({boardNo, category}));
  };

  useEffect(() => {
    dispatch(detail({ category, boardNo }));
  }, [dispatch, category, boardNo]);

  if (boardError) {
    return <div>Error occurred: {boardError.message}</div>;
  }

  return (
        <BoardDetailComponent
            board={board}
            comments={comments}
            content={content}
            onSubmit={onSubmit}
            onChange={onChange}
            onEdit={onEdit}
            onReset={onReset}
            onDelete={onDelete}
        />
  );
};

export default BoardDetailContainer;
