import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  width: 100%;
  height: 5rem;
`;

const FooterContainer = styled.div`
  text-align: center;
  background-color: white;
  color: white;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const FooterText = styled.p`
  color: #426B1F;
  font-size: 90%;
  margin: 0px;
`;

const FooterAddress = styled.address`
  color: #426B1F;
  font-size: x-small;
  font-style: italic;
`;

const Footer = () => {
  return (
      <FooterWrapper>
        <FooterContainer>
          <FooterText>수고했어요 오늘도 : )</FooterText>
          <FooterAddress>@힐링캠프</FooterAddress>
        </FooterContainer>
      </FooterWrapper>
  );
};

export default Footer;