import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BoardFormComponent from '../../components/board/BoardFormComponent';
import { useState, useEffect } from 'react';
import { changeField, initializeForm, form } from '../../modules/board';


const BoardFormContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { category, title, content, files, boardError, board } = useSelector(
      ({ board }) => ({
        category: board.category,
        title: board.title,
        content: board.content,
        files: board.attachedFiles,
        boardError: board.boardError,
        board: board.board,
      })
  );

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
    dispatch(form({ title, content, files, category }));
    dispatch(initializeForm());
  };

  //컴포넌트 초기 렌터링 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm());
  }, [dispatch]);

  useEffect(() => {
    if (boardError) {
      console.log('게시글 등록 중 오류 발생');
      console.log(boardError);
      // 필요한 경우 사용자에게 오류 메시지를 표시할 수 있습니다.
    }
    if (board) {
      console.log('게시글 등록 성공');
      console.log(board);
      navigate(`/board/list`);
    }
  }, [board, boardError, dispatch]);

  return (
      <BoardFormComponent
          title={title}
          content={content}
          files={files}
          category={category}
          onChange={onChange}
          onSubmit={onSubmit}
      />
  );
};

export default BoardFormContainer;
