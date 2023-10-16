import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../../components/auth/LoginComponent';
import { useState } from 'react';
import { changeField, initializeForm, login } from '../../modules/auth';
import { useEffect } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';


const LoginContainer = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { phoneNumber, password, authError, user, fcmToken } = useSelector(
      ({ auth }) => ({
        phoneNumber: auth.phoneNumber,
        password: auth.password,
        authError: auth.authError,
        user: auth.user,
        fcmToken: auth.fcmToken
      })
  );
  const firebaseConfig = {
    apiKey: "AIzaSyC4qX3g0OF5SKoRQd4hJVIwfaWjrX69a4k",
    authDomain: "snsp-778c0.firebaseapp.com",
    projectId: "snsp-778c0",
    storageBucket: "snsp-778c0.appspot.com",
    messagingSenderId: "7999778564",
    appId: "1:7999778564:web:8e578f288290f757be2a51",
    measurementId: "G-WPS0KLZ5L6"
  };
  const app = initializeApp(firebaseConfig);

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
        changeField({
          key: name,
          value,
        })
    );
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
      // navigate(`/`);
      navigate(`/myPage/${user.no}`);
      const getFCMToken = async () => {
        const messaging = getMessaging();
        const fcmToken = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_VAPID_KEY,
        });
        console.log('FCM Token:', fcmToken);
      };

      getFCMToken(); // 토큰 생성 및 전송 함수 호출
    }
  }, [user, authError, dispatch]);

  const getFCMToken = async () => {
    const messaging = getMessaging();
    const fcmToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });

    onSubmitWithFCMToken(fcmToken);
  };

  const onSubmitWithFCMToken = (fcmToken) => {
    dispatch(login({ phoneNumber, password, fcmToken }));
    dispatch(initializeForm());
    console.log('FCM Token:', fcmToken);

  };

  const onSubmit = (e) => {
    e.preventDefault();
    getFCMToken();
  };


  return (
      <LoginComponent
          phoneNumber={phoneNumber}
          password={password}
          fcmToken={fcmToken}
          onChange={onChange}
          onSubmit={onSubmit}
      />
  );
};

export default LoginContainer;