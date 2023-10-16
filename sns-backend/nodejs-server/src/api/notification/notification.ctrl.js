import Noti from '../../schemas/noti';
import { redisClient } from '../../redis';
import User from "../../schemas/user";
import admin from 'firebase-admin'; // Firebase Admin SDK 모듈을 import

// Firebase 애플리케이션 초기화
const serviceAccount = require('./snsp-778c0-firebase-adminsdk-v8fz8-f8923eb6ed.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // 기타 설정...
});
export const addLog = async (req, res, next) => {
  const admin = require('firebase-admin');
  try {
    const fcmToken = await redisClient.get("FcmToken:" + req.body.memberNo);
    const notiLog = await Noti.create({
      mno: req.body.memberNo,
      ntno: req.body.notiTypeNo,
      content: req.body.content,
      url: req.body.url,
      noti_state: req.body.notiState,
    });

    // Firebase 알림 메시지 전송
    if (fcmToken) {

      const message = {
        data: {
          title: 'following',
          body: '팔로잉하였습니다.',
        },
        token: fcmToken,
      };

      const response = await admin.messaging().send(message);
      console.log('Successfully sent following notification:', response);
    } else {
      console.error('User not found for the specified memberNo.');
    }

    return res.json(notiLog);
  } catch (err) {
    console.error(err);
    res.status(403).send(err);
    return next(err);
  }
};

export const listNotiLog = async (req, res, next) => {
  try {
    const [notiLogs, notiLogCount] = await Promise.all([
      Noti.find({ mno: req.params.memberNo })
        .sort({ createdAt: -1 })
        .limit(req.query.limit)
        .skip((req.query.page - 1) * req.query.limit),
      Noti.countDocuments({
        mno: req.params.memberNo,
      }),
    ]);

    const lastPage = Math.ceil(notiLogCount / req.query.limit);
    return res.json({ notis: notiLogs, lastPage });
  } catch (err) {
    console.error(err);
    res.status(403).send(err);
    return next(err);
  }
};

export const notReadNotiCount = async (req, res, next) => {
  try {
    const count = await Noti.countDocuments({
      mno: req.params.memberNo,
      noti_state: 0,
    });
    return res.json(count);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return next(error);
  }
};

export const updateNotiState = async (req, res, next) => {
  try {
    const result = await Noti.updateOne(
      { _id: req.body._id },
      { noti_state: req.body.notiState }
    );
    return res.json(result);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return next(error);
  }
};

export const updateAllNotiState = async (req, res, next) => {
  try {
    const result = await Noti.updateMany(
      { mno: req.body.memberNo },
      { noti_state: req.body.notiState }
    );
    return res.json(result);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return next(error);
  }
};

export const addFollowingLog = async (req, res) => {
  try {

    const userNo = await redisClient.get(req.cookies['sessionId']);
    const userToken = await redisClient.get(req.fcmToken);
    const sendUser = await User.findOne({ mno: userNo });
    console.log(userToken);
    console.log(sendUser);
    const findToken = await Noti.create({
    fcmToken: userToken.fcmToken,
    user: sendUser._id,
    });

    if (findToken) {
      // FCM 토큰을 찾았을 때
      res.json({ findToken });
    } else {
      // FCM 토큰을 찾지 못했을 때
      res.status(404).json({ error: 'FCM token not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
