import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import AuthTemplate from './AuthTemplate';

const RegisterForm = styled.div`
  width: 70%;
  height: 80%;
  justify-items: center;
  align-items: center;
  background-color: white;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 80%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  margin-left: 5px;

  ::placeholder {
    color: #3a3a3a;
  }
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: row; /* 입력 필드와 레이블을 가로로 나열 */
  align-items: center;
  justify-content: space-between; /* 레이블과 입력 필드 간 간격을 벌립니다. */
  width: 70%;
  margin-bottom: 40px;
`;

const Label = styled.label`
  width: 30%; /* 레이블의 너비 조정 */
  text-align: center;
  font-size: 1.2rem;
  margin-right: 30px; /* 레이블과 입력 필드 사이 간격 조정 */
`;

const InputWrapper = styled.div`
  width: 100%; /* 인풋 필드의 너비 조정 */
`;

const SubmitButton = styled(Button)`
  width: 130px;
  height: 50px;
  display: block;
  margin: 0 auto;
  margin-top: 30px;
  padding: 5px 10px;
  background-color: #426b1f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 25px;
`;

const CodeButton = styled(Button)`
  padding: 5px 10px;
  background-color: #426b1f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  width: 150px;
  font-size: 20px;
`;

const PhoneNumberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const VerifyWrapper = styled.div`
  display: flex;
  flexdirection: 'column';
  marginright: '-170px';
`;

const ButtonFlexWrapper = styled.div`
  display: flex;
  alignitems: 'baseline';
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HorizontalWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const StyledInput2 = styled.input`
  width: 200px;

  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  margin-left: 5px;

  ::placeholder {
    color: #3a3a3a;
  }
`;
const RegisterComponent = ({
  name,
  nick,
  phoneNumber,
  password,
  photo,
  verificationCode,
  onSubmit,
  onChange,
  onChangeFile,
  onAuthPhoneNumber,
  onCheckPhoneNumber,
}) => {
  return (
    <AuthTemplate>
      <h1>회원가입</h1>
      <RegisterForm>
        <InputBlock>
          <Label>🌱 이름</Label>
          <InputWrapper>
            <StyledInput
              type="text"
              name="name"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={onChange}
            />
          </InputWrapper>
        </InputBlock>
        <InputBlock>
          <Label>🌱 닉네임</Label>
          <InputWrapper>
            <StyledInput
              type="text"
              name="nick"
              placeholder="닉네임을 입력하세요"
              value={nick}
              onChange={onChange}
            />
          </InputWrapper>
        </InputBlock>
        <InputBlock>
          <Label>🌱 전화번호</Label>
          <PhoneNumberWrapper>
            <Wrapper>
              <HorizontalWrapper>
                <StyledInput
                  width="200px"
                  type="text"
                  name="phoneNumber"
                  placeholder="전화번호를 입력하세요"
                  value={phoneNumber}
                  onChange={onChange}
                />
                <CodeButton type="sendCode" onClick={onAuthPhoneNumber}>
                  인증번호전송
                </CodeButton>
              </HorizontalWrapper>

              <HorizontalWrapper>
                <StyledInput
                  width="200px"
                  type="text"
                  name="verificationCode"
                  placeholder="인증번호를 입력하세요"
                  value={verificationCode}
                  onChange={onChange}
                />
                <CodeButton type="verifyCode" onClick={onCheckPhoneNumber}>
                  인증번호확인
                </CodeButton>
              </HorizontalWrapper>
            </Wrapper>
          </PhoneNumberWrapper>
        </InputBlock>
        <InputBlock>
          <Label>🌱 비밀번호</Label>
          <InputWrapper>
            <StyledInput
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={onChange}
            />
          </InputWrapper>
        </InputBlock>
        <InputBlock>
          <Label>🌱 프로필사진</Label>
          <InputWrapper>
            <StyledInput type="file" name="photo" onChange={onChangeFile} />
          </InputWrapper>
        </InputBlock>
        <SubmitButton type="submit" onClick={onSubmit}>
          가입하기
        </SubmitButton>
      </RegisterForm>
    </AuthTemplate>
  );
};

export default RegisterComponent;
