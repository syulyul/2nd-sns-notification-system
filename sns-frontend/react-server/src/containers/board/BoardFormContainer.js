import { useNavigate } from 'react-router-dom';
import BoardFormComponent from '../../components/board/BoardFormComponent';
import { useState } from 'react';

const BoardFormContainer = () => {

  const [boardFormData, setBoardFormData] = useState({
    title: '임시 제목',
    content: '임시 내용',
    files: null,
    category: '임시 카테고리'
  });

  // const navigate = useNavigate();
  // const [error, setError] = useState(null);
  //
  // const title = '임시 제목';
  // const content = '임시 내용';
  // const files = null;
  // const category = '임시 카테고리';

  // const onChange = (e) => {
  //   console.log(e.target.value);
  // };
  //
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Submitted with:', { title, content, files, category });
  //   navigate(`/`);
  // };
  //
  // if (error) {
  //   console.log('오류 발생:', error);
  // } else {
  //   console.log('글 작성 성공');
  // }

  return <BoardFormComponent boardFormData = {boardFormData} />;
};

export default BoardFormContainer;
