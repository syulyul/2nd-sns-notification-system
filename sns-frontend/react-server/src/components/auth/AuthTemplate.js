import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
  height: 100vh;
  margin: 0;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: #426b1f;
`;

const WhiteBox = styled.div`
  width: 70%;
  height: 80%;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: white;
  border-radius: 7px;
`;
const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>{children}</WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
