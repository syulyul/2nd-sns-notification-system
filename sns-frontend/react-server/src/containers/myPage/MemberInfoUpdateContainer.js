import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeMyPageField,
  info,
  initializeForm,
  update,
} from '../../modules/myPage';
import MemberInfoUpdateComponent from '../../components/myPage/MemberInfoUpdateComponent';

const MemberInfoUpdateContainer = () => {
  const dispatch = useDispatch();
  const { user, myPage, myPageError, userNo } = useSelector(
    ({ auth, myPage }) => ({
      user: auth.user,
      myPage: myPage.myPage,
      myPageError: myPage.myPageError,
      userNo: auth.user.no,
    })
  );

  //컴포넌트 초기 렌터링 때 form 초기화
  useEffect(() => {
    dispatch(info(userNo));
  }, [dispatch, userNo]);

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeMyPageField({ key: name, value }));
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: 폼 데이터를 사용하여 API 호출
    dispatch(
      update({
        userNo: myPage.no,
        photo: myPage.photo,
        name: myPage.name,
        nick: myPage.nick,
        birthday: myPage.birthday,
        email: myPage.email,
        phoneNumber: myPage.phoneNumber,
        password: myPage.password,
        gender: myPage.gender,
      })
    );
  };

  return (
    <MemberInfoUpdateComponent
      myPageData={myPage}
      myPageError={myPageError}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default MemberInfoUpdateContainer;
