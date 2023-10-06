import React, { useEffect, useState } from 'react';
import MemberInfoComponent from '../../components/myPage/MemberInfoComponent';
import { useSelector } from 'react-redux';
import client from '../../lib/api/client';

const MemberInfoContainer = () => {
  const { user } = useSelector(({ auth }) => ({
    user: auth.user,
  }));

  // 받아온 데이터를 저장할 상태
  const [myPageData, setMyPageData] = useState(null);

  useEffect(() => {
    if (user) {
      const { no } = user; // 사용자 번호 추출

      // 백엔드 서버로 데이터 요청
      client
      .get(`/spring/myPage/${no}`) // API 엔드포인트 확인
      .then((response) => {
        // 성공적으로 데이터를 받아왔을 때 처리
        const data = response.data; // 받아온 데이터
        setMyPageData(data); // 데이터를 상태에 저장
      })
      .catch((error) => {
        // 데이터 요청 실패 또는 오류 처리
        console.error('Error fetching myPageData:', error);
      });
    }
  }, [user, myPageData]);

  return (
      <div>
        {/* myPageData가 로딩 중이거나 없을 때의 처리 */}
        {myPageData ? (
            <MemberInfoComponent myPageData={myPageData} user={user} />
        ) : (
            <p>Loading...</p>
        )}
      </div>
  );
};

export default MemberInfoContainer;