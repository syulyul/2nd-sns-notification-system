import styled from 'styled-components';
import Button from '../common/Button';
import AuthTemplate from './AuthTemplate';

const FindForm = styled.div`
  align-self: flex-start;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 1.2rem;
  
  .input[type="text"]
  {
    padding: 10px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80%;
    max-width: 300px;
  }

  .button {
    padding: 10px 20px;
    background-color: #426B1F;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .button:hover {
    background-color: #426B1F;
  }

  @font-face {
    font-family: 'UhBeeKeongKeong';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_five@.2.0/UhBeeKeongKeong.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body, p, h1, h2, h3, h4, h5, h6, textarea, input, button, a {
    font-family: 'UhBeeKeongKeong', sans-serif;
  }

  button {
    font-size: 20px;
  }

  body {
    font-size: 20px;
  }

  .send-button, .verify-button, .change-button {
    margin-left: 30px;
    width: 220px;
  }

  #sendresult, #verifyresult, #changeresult{
    color: black;
    font-weight: bold;
    margin-top: 1px;
  }

  .table1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 100px;
  }

  .table2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  #newPasswordForm {
    display: none;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center; /* 가운데 정렬 */
    margin-left: 760px;
  }

  .input-field {
    padding: 10px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 300px;
    margin-left: 40px;
  }

  .common-button {
    padding: 10px 20px;
    background-color: #426B1F;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 160px;
    margin-left: 25px;
  }
`;
const StyledInput = styled.input`
  border: 1px solid #ccc;
  margin: 5px;
  border-radius: 3px;
  padding: 10px;
  width: 80%;
  max-width: 300px;


  ::placeholder {
    color: #3a3a3a;
`;

const SubmitButton = styled(Button)`
  margin-left:30px;
  width: 220px;
  padding: 10px 20px;
  background-color: #426B1F;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CommonButton = styled(Button)`
  padding: 10px 20px;
  background-color: #426B1F;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 160px;
  margin-left:25px;
  margin-bottom: 100px;
`;
const PwFindComponent = () => {
  return <AuthTemplate>
    <table className="table1">
      <h1>비밀번호 찾기</h1>
    </table>
<FindForm>
  <table className="table2">
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <label  style={{ width: '200px' }}>🌱 전화번호</label>
    <StyledInput
        type="text"
        name="phoneNumber"
        placeholder="전화번호를 입력하세요"
    />
<SubmitButton class="send-button">
  인증번호 전송
</SubmitButton>
    </div>
    <p id="sendresult"></p>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label style={{ width: '200px' }}>🌱 인증번호</label>
      <StyledInput
          type="text"
          id="verificationCode"
          placeholder="인증번호를 입력하세요"/>
      <SubmitButton class="verify-button" id="verifyCode">
        인증번호 확인
      </SubmitButton>
    </div>
    <p id="verifyresult"></p>
  </table>
  <div id="newPasswordForm" style={{
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }} >
    <label style={{ width: '200px' }}>🌱 새 비밀번호</label>
    <StyledInput
        class="input-field"
        type="password"
        id="newPassword"
        placeholder="새로운 비밀번호를 입력하세요"
    />
    <SubmitButton class="common-button" id="changePassword">
      비밀번호 변경
    </SubmitButton>
  </div>
<CommonButton style={{ marginTop: '80px' }}>
  돌아가기
</CommonButton>
</FindForm>
  </AuthTemplate>;
};

export default PwFindComponent;