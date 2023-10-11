import React, {useEffect, useState} from 'react';
import MemberInfoComponent from '../../components/myPage/MemberInfoComponent';
import {useDispatch, useSelector} from 'react-redux';
import { list, follow, initializeForm } from "../../modules/myPage";
import { useNavigate } from 'react-router-dom';

const MemberInfoContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {user} = useSelector(({auth}) => ({
    user: auth.user,
  }));

  const {myPage, myPageError, userNo} = useSelector(({myPage}) => ({
    myPage: myPage.myPage,
    myPageError: myPage.myPageError,
    userNo: myPage.no,
  }));

  //컴포넌트 초기 렌터링 때 form 초기화
  useEffect(() => {
    dispatch(list(userNo));
  }, [dispatch, userNo]);

  // 에러가 발생하면 에러 메시지를 출력합니다.
  if (myPageError) {
    return <div>오류가 발생했습니다: {myPageError.message}</div>;
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(follow( userNo ));
    dispatch(initializeForm());
    navigate(`/myPage/${user.no}?show=followings`);

  };


  return (
      <MemberInfoComponent
          onSubmit={onSubmit}
          follow={userNo}
          myPageData={myPage}
          user={user}/>
  );
};

export default MemberInfoContainer;