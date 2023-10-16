import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterComponent from '../../components/auth/RegisterComponent';
import {
  changeField,
  checkAuthCode,
  getAuthCode,
  initializeForm,
  register,
} from '../../modules/auth';
import { useEffect } from 'react';

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    nick,
    name,
    phoneNumber,
    password,
    verificationCode,
    verificationState,
    authError,
    user,
  } = useSelector(({ auth }) => ({
    nick: auth.nick,
    name: auth.name,
    phoneNumber: auth.phoneNumber,
    password: auth.password,
    photo: auth.photo,
    verificationCode: auth.verificationCode,
    verificationState: auth.verificationState,
    authError: auth.authError,
    user: auth.user,
  }));

  let formData = new FormData();
  formData.append('files', null);
  const onChangeFile = (e) => {
    const { files } = e.target;
    formData = new FormData();
    formData.append('files', files[0]);
  };

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
    formData.append(
      'data',
      new Blob([JSON.stringify({ nick, name, phoneNumber, password })], {
        type: 'application/json',
      })
    );
    formData.append(
      'verificationCode',
      new Blob([verificationCode], {
        type: 'application/json',
      })
    );
    dispatch(register({ formData }));
    dispatch(initializeForm());
  };

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if (user) {
      console.log('로그인 성공');
      console.log(user);
      // navigate(`/`);
      navigate(`/myPage/${user.no}`);
    }
  }, [user, authError, dispatch]);

  const onAuthPhoneNumber = (e) => {
    e.preventDefault();
    dispatch(getAuthCode({ phoneNumber }));
  };
  const onCheckPhoneNumber = (e) => {
    e.preventDefault();
    dispatch(checkAuthCode({ phoneNumber, verificationCode }));
  };

  return (
    <RegisterComponent
      nick={nick}
      name={name}
      phoneNumber={phoneNumber}
      password={password}
      verificationCode={verificationCode}
      verificationState={verificationState}
      onChange={onChange}
      onChangeFile={onChangeFile}
      onAuthPhoneNumber={onAuthPhoneNumber}
      onCheckPhoneNumber={onCheckPhoneNumber}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterContainer;
