import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { rootSaga } from './modules';
import createSagaMiddleware from 'redux-saga';
import { check } from './modules/auth';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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
const messaging = getMessaging(app); // Firebase 앱 초기화 후 messaging 인스턴스를 생성

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer, // combineReducers로 리듀서를 묶은 리덕스 모듈 파일
  middleware: [sagaMiddleware], // 사용할 미들웨어들을 나열
  devTools: true, // 기본은 true로 설정되어있다. 개발자 도구의 사용 여부를 정한다.
  preloadedState: {
    // loading: {
    //   loadingState: true,
    //   loadingTest: '123 Loading!',
    // },
  }, // 리덕스 스토어가 생성될 때, 초기값을 정의한다.
});

function loadUser() {
  try {
    store.dispatch(check());
  } catch (e) {
    console.log('store.dispatch(check()) is not working!');
  }
}
async function getFCMToken() {
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });
    console.log("FCM Token:", token);
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
}

getFCMToken();
function requestPermission() {
  console.log("권한 요청 중...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("알림 권한이 허용됨");
      // FCM 메세지 처리
    } else {
      console.log("알림 권한 허용 안됨");
    }
  });
}

sagaMiddleware.run(rootSaga);
loadUser();
requestPermission(); // 앱 시작 시 권한 요청

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
