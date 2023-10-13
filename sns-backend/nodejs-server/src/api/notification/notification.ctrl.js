import Noti from '../../schemas/noti';
import { redisClient } from '../../redis';
import User from "../../schemas/user";
import Chat from "../../schemas/chat";

export const addLog = async (req, res, next) => {
  try {
    const notiLog = await Noti.create({
      mno: req.body.memberNo,
      ntno: req.body.notiTypeNo,
      content: req.body.content,
      url: req.body.url,
      noti_state: req.body.notiState,
    });
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

    console.log(notiLogCount);
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
