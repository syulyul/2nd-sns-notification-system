import React, { useState, useEffect } from 'react';
import MemberInfoComponent from '../../components/myPage/MemberInfoComponent';
import { useSelector } from 'react-redux';
import client from '../../lib/api/client'; // axios client를 가져옵니다.

const MemberInfoContainer = () => {
  const { user } = useSelector(({ auth }) => ({
    user: auth.user,
  }));

  useEffect(() => {
    // user 정보가 변경될 때마다 실행되도록 useEffect를 사용합니다.
    if (user) {
      const { visitCount, photo, nick, no } = user;
      const url = `/spring/myPage/${no}`; // URL을 동적으로 생성합니다.
      const config = {
        params: { visitCount, photo, nick, no },
      };

      // Axios를 사용하여 GET 요청을 보냅니다.
      client
      .get(url, config)
      .then((response) => {
        // 성공적인 응답 처리
        console.log(response.data);
      })
      .catch((error) => {
        // 오류 처리
        console.error(error);
      });
    }
  }, [user]);

  return <MemberInfoComponent user={user} />;
};

export default MemberInfoContainer;