import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MemberListBox = styled.div`
  margin-left: 18px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
`;

const MemberItem = styled.div`
  margin-top: 0px;
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
  color: #426b1f;
  background-color: transparent;
`;

const FollowComponent = ({ followListData, session, handleFollow, handleUnfollow }) => {
  return (
      <MemberListBox>
        <h3>🌱 팔로워 리스트</h3>
        {followListData && followListData.map(myPage => (
            <MemberItem key={myPage.no}>
              {/* 프로필 사진 로딩 부분 */}
              {/*<MemberPhoto*/}
              {/*    src={*/}
              {/*      myPage.photo*/}
              {/*          ? `https://kr.object.ncloudstorage.com/bitcamp-nc7-bucket-14/sns_member/${myPage.photo}`*/}
              {/*          : 'images/default.jpg'*/}
              {/*    }*/}
              {/*/>*/}
              {/* 프로필 사진 로딩 부분 */}
              <MemberLink href={`/myPage/${myPage.no}`}>{myPage.nick}</MemberLink>
              <Link to={`/myPage/${myPage.no}/chat`}>채팅하기</Link>
              {session.loginUser.followMemberSet.includes(myPage.no) ? (
                  <button onClick={() => handleUnfollow(myPage.no)}>팔로잉 취소</button>
              ) : (
                  <button onClick={() => handleFollow(myPage.no)}>팔로우 하기</button>
              )}
            </MemberItem>
        ))}
      </MemberListBox>
  );
};

export default FollowComponent;