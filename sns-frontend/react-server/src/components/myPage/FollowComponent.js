import React from 'react';
import styled from 'styled-components';
import defaultImage from '../../images/default.jpg';

const MemberListBox = styled.div`
    margin-left:18px;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
`;

const MemberItem = styled.div`
    margin-top:0px;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    border-bottom: 1px solid #ccc;
`;

const MemberPhoto = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
`;

const MemberLink = styled.a`
    margin-top: 25px;
    text-decoration: none;
    color: black;
`;

const ToggleLabel = styled.label`
    margin-top: 25px;
    color: #426B1F;
    background-color: transparent;
`;

const FollowComponent = ({ followList, session }) => {
  return (

      <MemberListBox>
        <h3>🌱 팔로워 리스트</h3>
        {followList.map(member => (
            <MemberItem key={member.no}>
              <MemberPhoto src={defaultImage} />
              {/*{followList.map(member => (*/}
              {/*    <MemberItem key={member.no}>*/}
              {/*      {!member.photo ? (*/}
              {/*          <MemberPhoto src={defaultImage} />*/}
              {/*      ) : (*/}
              {/*          <MemberPhoto src={`https://kr.object.ncloudstorage.com/bitcamp-nc7-bucket-14/sns_member/${member.photo}`} />*/}
              {/*      )}*/}
              <MemberLink href={`#/myPage/${member.no}`}>{member.nick}</MemberLink>
              {session.loginUser.followMemberSet.includes(member.no) ? (
                  <ToggleLabel>팔로잉 취소</ToggleLabel>
              ) : (
                  <ToggleLabel>팔로우 하기</ToggleLabel>
              )}
            </MemberItem>
        ))}
      </MemberListBox>
  );
};

export default FollowComponent;