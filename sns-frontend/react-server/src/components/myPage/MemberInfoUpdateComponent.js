import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 600px;
  background-color: #ffffff;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 20px;
  padding-top: 5px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-left: 10%;
`;

const CustomTextarea = styled.textarea`
  font-size: 16px;
  border: none;
  background-color: transparent;
  width: 100%;
  resize: none;
  height: 5em;
`;

const UserPhoto = styled.img`
  float: right;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin-left: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  text-align: center;
  margin-top: 10px;
  justify-content: center;
`;

const CustomButton = styled.button`
  background-color: #426b1f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #5d962c;
  }
`;

const CustomLink = styled.a`
  text-decoration: none;
  color: darkgrey;
  font-size: 15px;
  margin-top: 20px;
  margin-left: 540px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const FormLabel = styled.label`
  flex: 1;
  margin-right: -100px;
  font-weight: bold;
`;

const FormInput = styled.input`
  flex: 1;
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-right: 26%;
`;

const FormSelect = styled.select`
  flex: 1;
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-right: 26%;
`;

const FormFileInput = styled.input`
  flex: 1;
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-right: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledH1 = styled.h1`
  text-align: center;
`;

const MemberInfoUpdateComponent = ({ myPageData }) => {
  return (
    <FormContainer>
      <StyledH1>내 정보 수정</StyledH1>

      <FormGroup>
        <FormLabel>🌱 사진</FormLabel>
        <FormFileInput
          type="file"
          id="photofile"
          name="photofile"
          onChange={() => {
            /* 이미지 프리뷰 함수 */
          }}
        />
        {myPageData.photo ? (
          <UserPhoto src={myPageData.photo} alt="User Profile" />
        ) : (
          <UserPhoto
            src={process.env.PUBLIC_URL + '/images/default.jpg'}
            alt="Default Image"
          />
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel>🌱 이름</FormLabel>
        <FormInput type="text" name="name" value={myPageData.name} readOnly />
      </FormGroup>

      <FormGroup>
        <FormLabel>🌱 닉네임</FormLabel>
        <FormInput type="text" name="nick" value={myPageData.nick} />
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="birthday">🌱 생일</FormLabel>
        <FormInput type="date" name="birthday" value={myPageData.birthday} />
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="email">🌱 이메일</FormLabel>
        <FormInput type="email" name="email" value={myPageData.email} />
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="phone">🌱 전화번호</FormLabel>
        <FormInput
          type="tel"
          name="phoneNumber"
          value={myPageData.phoneNumber}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="password">🌱 암호</FormLabel>
        <FormInput type="password" name="password" />
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="gender">🌱 성별</FormLabel>
        <FormSelect id="gender" name="gender" value={myPageData.gender}>
          <option value="1">남자</option>
          <option value="2">여자</option>
        </FormSelect>
      </FormGroup>

      <ButtonContainer>
        <CustomButton type="submit">수정</CustomButton>
        <CustomButton type="reset">초기화</CustomButton>
      </ButtonContainer>
      <CustomLink href={`/myPage/${myPageData.no}/update`}>탈퇴하기</CustomLink>
    </FormContainer>
  );
};

export default MemberInfoUpdateComponent;
