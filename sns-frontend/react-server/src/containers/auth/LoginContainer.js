import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../../components/auth/LoginComponent';
import { useState } from 'react';
import { changeField, initializeForm, login } from '../../modules/auth';
import { useEffect } from 'react';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { phoneNumber, password, authError, user } = useSelector(
    ({ auth }) => ({
      phoneNumber: auth.phoneNumber,
      password: auth.password,
      authError: auth.authError,
      user: auth.user,
    })
  );

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        key: name,
        value,
      })
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ phoneNumber, password }));
    dispatch(initializeForm());
  };

  //컴포넌트 초기 렌터링 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm());
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }
    if (user) {
      console.log('로그인 성공');
      console.log(user);
      navigate(`/`);
      // navigate(`/myPage/${user.no}`);
    }
  }, [user, authError, dispatch]);

  return (
    <LoginComponent
      phoneNumber={phoneNumber}
      password={password}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default LoginContainer;
