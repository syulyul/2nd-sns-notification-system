import styled from "styled-components";

const MyPageTemplateBlock = styled.div`
  margin: 0;
  padding: 0;
`;

const MyPageBox = styled.div`
  margin-left:40px;
  display: inline-flex;
  justify-content: center;
  padding: 20px;
  padding-top: 0px;
`;

const MyPageTemplate = ({ children }) => {
  return (
      <MyPageTemplateBlock>
        <MyPageBox>{children}</MyPageBox>
      </MyPageTemplateBlock>
  );
};

export default MyPageTemplate;