import React from 'react';
import styled from 'styled-components';


const WriteFormContainer = styled.div`
    padding: 20px;
    background-color: #f2f2f2;
    width: 700px;
    margin: auto;
`;

const StyledForm = styled.form`
    text-align: center;
`;

const StyledInput = styled.input`
    box-sizing: border-box;
    width: 641px;
    height: 42px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.17);
    margin: 10px auto;
    display: block;
    
    &[name='title'] {
        font-size: 25px;
    }
    
    &[type='file']::-webkit-file-upload-button {
        width: 89px;
        height: 36px;
        background: #D9D9D9;
        border: none;
        border-radius: 4px;
        color: #000;
        font-weight: bold;
        cursor: pointer;
    }
`;

const StyledTextarea = styled.textarea`
    box-sizing: border-box;
    width: 641px;
    height: 500px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.17);
    margin: 10px auto;
    display: block;
    font-size: 20px;
`;

const StyledButton = styled.button`
    width: 100px;
    height: 41px;
    background: #426B1F;
    border-radius: 8px;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    display: block;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    margin: 10px auto;
`;

const WriteFormComponent = () => {
  const title = '임시 제목';   // 임시변수
  const content = '임시 내용'; // 임시변수
  const files = null; // 임시변수
  const category = '임시 카테고리'; // 임시변수

  const onChange = (e) => {
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted with:', { title, content, files, category });
  };

  return (
      <WriteFormContainer>
        <h1 style={{ textAlign: 'center' }}>🌱글쓰기🌱</h1>
        <StyledForm onSubmit={onSubmit}>
          <StyledInput
              type="text"
              name="title"
              placeholder="제목을 입력하세요"
              value={title || ''}
              onChange={onChange}
          />
          <StyledTextarea
              name="content"
              placeholder="내용을 입력하세요"
              value={content}
              onChange={onChange}
          />
          <StyledInput
              type="file"
              name="files"
              multiple
              placeholder="제목을 입력하세요"
              onChange={onChange}
          />
          <StyledInput
              type="hidden"
              name="category"
              value={category}
          />
          <StyledButton type="submit">등록</StyledButton>
        </StyledForm>
      </WriteFormContainer>
  );
};

export default WriteFormComponent;
