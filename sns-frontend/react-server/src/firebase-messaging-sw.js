// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
//
// const firebaseConfig = {
//   apiKey: "AIzaSyC4qX3g0OF5SKoRQd4hJVIwfaWjrX69a4k",
//   authDomain: "snsp-778c0.firebaseapp.com",
//   projectId: "snsp-778c0",
//   storageBucket: "snsp-778c0.appspot.com",
//   messagingSenderId: "7999778564",
//   appId: "1:7999778564:web:8e578f288290f757be2a51",
//   measurementId: "G-WPS0KLZ5L6"
// };
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
//
// async function requestPermission() {
//   console.log("권한 요청 중...");
//
//   const permission = await Notification.requestPermission();
//   if (permission === "denied") {
//     console.log("알림 권한 허용 안됨");
//     return;
//   }
//
//   console.log("알림 권한이 허용됨");
//
//   const token = await getToken(messaging, {
//     vapidKey: process.env.REACT_APP_VAPID_KEY,
//   });
//
//   if (token) console.log("token: ", token);
//   else console.log("Can not get Token");
//
//   onMessage(messaging, (payload) => {
//     console.log("메시지가 도착했습니다.", payload);
//     // ...
//   });
// }
//
// requestPermission();