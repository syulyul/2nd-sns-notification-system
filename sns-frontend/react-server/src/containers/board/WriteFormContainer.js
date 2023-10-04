import { useNavigate } from 'react-router-dom';
import WriteFormComponent from '../../components/board/WriteFormComponent';
import { useState } from 'react';

const WriteFormContainer = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const title = '임시 제목';
  const content = '임시 내용';
  const files = null;
  const category = '임시 카테고리';

  const onChange = (e) => {
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted with:', { title, content, files, category });
    navigate(`/`);
  };

  if (error) {
    console.log('오류 발생:', error);
  } else {
    console.log('글 작성 성공');
  }

  return (
      <WriteFormComponent
          title={title}
          content={content}
          files={files}
          category={category}
          onChange={onChange}
          onSubmit={onSubmit}
      />
  );
};

export default WriteFormContainer;
