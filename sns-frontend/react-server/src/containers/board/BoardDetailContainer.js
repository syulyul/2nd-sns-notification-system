import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate  } from 'react-router-dom';
import BoardDetailComponent from '../../components/board/BoardDetailComponent';
import { changeField, initializeForm, detail, addComment, deleteBoard, deleteComment } from '../../modules/board';
import { boardlike, boardunlike } from '../../modules/auth';

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

  const { board = boardDefault, comments = Array(5).fill(commentDefault), boardError, user, likeBoardSet}  = useSelector(state => ({
    board: state.board.board,
    comments: state.board.comments,
    boardError: state.board.boardError,
    user: state.auth.user,
    likeBoardSet : state.auth.likeBoardList,
  }));

  const { boardNo, category } = useParams();

  const onChange = ({ key, value }) => {
    dispatch(changeField({ key, value }));
  };

  const onEdit = () => {
    const updatedBoard = { ...board, editable: true };

  };

  //게시글초기화
  const onReset = () => {
    dispatch(initializeForm());  // 상태를 초기화
    dispatch(detail({ category, boardNo }));  // 다시 상세 정보를 불러옴
  };

  //게시글삭제
  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteBoard({boardNo, category}));
  };

  //댓글
  //댓글작성
  const onSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      boardNo: parseInt(boardNo, 10),
      content,
      writer: user,
    };
    dispatch(addComment(commentData));
    dispatch(detail({ category, boardNo }));
    setContent('');  // 입력 필드 초기화
  };

  //댓글삭제
  const onDeleteComment = (commentNo) => {
    dispatch(deleteComment({commentNo, boardNo}));
    dispatch(detail({ category, boardNo }));
  };

  const CommentChange = (e) => {
    setContent(e.target.value);
  };

// 좋아요
  const handleLike = (boardNo) => {
    dispatch(boardlike(boardNo));
  };
  const handleUnlike = (boardNo) => {
    dispatch(boardunlike(boardNo));
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
            onDeleteComment={onDeleteComment}
            CommentChange={CommentChange}
            boardNo={boardNo}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            likeBoardSet={likeBoardSet}
        />
  );
};

export default BoardDetailContainer;
