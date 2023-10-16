import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCtHIECu07b0AH3kKP0UkqK2qL7fmv2AMs",
  authDomain: "test-365ca.firebaseapp.com",
  projectId: "test-365ca",
  storageBucket: "test-365ca.appspot.com",
  messagingSenderId: "490760290246",
  appId: "1:490760290246:web:c2709603f381600f66bcc7",
  measurementId: "G-MQNZNNVJ7E"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });

  if (token) console.log("token: ", token);
  else console.log("Can not get Token");

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
    // ...
  });
}

requestPermission();