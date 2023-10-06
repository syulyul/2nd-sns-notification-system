import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Sidebar = styled.div`
    float: left;
    width: 430px;
    height: 700px;
    padding: 20px;
    background-color: #FAFAF5;
    border-radius: 5px;
`;

const ProfilePic = styled.img`
    width: 300px;
    height: auto;
    border-radius: 50%;
    margin: auto;
    justify-content: center;
    display: flex;
`;

const ButtonContainer = styled.div`
    display: flex;
    text-align: center;
    margin-top: 10px;
    justify-content: center;
`;

const SidebarButton = styled.a`
    font-size: 20px;
    background-color: #426B1F;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 15px 40px;
    cursor: pointer;
    white-space : nowrap;
    text-decoration-line: none;
    margin: 30px;

    &:hover {
        background-color: #5d962c;
        color: white;
    }
`;

const EditInfoLink = styled(Link)`
  text-decoration: none;
  color: #426B1F;
  margin: 0 0 0 20px;
  padding: 15px 20px;
  text-align: right;
  float: right;
`;

const StateMessageLabel = styled.p`
    display: inline;
    font-weight: bold;
    flex: 1;
    margin-right: 10px;
`;

const StateMessage = styled.textarea`
    width: 100%;
    border: none;
    background-color: transparent;
    resize: none;
    margin-bottom: 10px;
`;

const StateMessageTextarea = styled.textarea`
    border: none;
    background-color: transparent;
    width: 100%;
    resize: none;
`;

const MemberInfoComponent = ({ myPageData, user }) => {
  const profileUrl = `http://gjoxpfbmymto19010706.cdn.ntruss.com/sns_member/${user.photo}?type=f&w=270&h=270&faceopt=true&ttype=jpg`;
  return (
      <Sidebar>
        <p>🌱 총 방문자 수 {myPageData.visitCount}</p>
        {myPageData.photo
            ? <ProfilePic src='/images/default.jpg' alt="기본 이미지" />
            : <ProfilePic src={profileUrl} alt="프로필 사진" />
        }
        <h2>{user.nick}</h2>
        <StateMessageLabel>상태메시지</StateMessageLabel>
        <EditInfoLink to={`/myPage/${myPageData.no}/info`}>내 정보 수정</EditInfoLink>
        <StateMessageTextarea
            name="stateMessage"
            readOnly
            value={myPageData.stateMessage || "상태 메시지가 없습니다."}
        />

        <ButtonContainer>
          <SidebarButton href={`/myPage/${myPageData.no}?show=followings`}>팔로잉</SidebarButton>
          <SidebarButton href={`/myPage/${myPageData.no}?show=followers`}>팔로워</SidebarButton>
        </ButtonContainer>
      </Sidebar>
  );
};

export default MemberInfoComponent;