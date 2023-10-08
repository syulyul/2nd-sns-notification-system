import Noti from '../../schemas/noti';

export const addLog = async (req, res, next) => {
  try {
    const notiLog = await Noti.create({
      mno: req.body.memberNo,
      ntno: req.body.notiTypeNo,
      content: req.body.content,
      url: req.body.url,
      noti_state: req.body.notiState,
    });
    res.json(notiLog);
  } catch (err) {
    console.error(err);
    res.status(403).send(err);
    next(err);
  }
};

export const listNotiLog = async (req, res, next) => {
  try {
    const [notiLogs, notiLogCount] = await Promise.all([
      Noti.find({ mno: req.body.memberNo })
        .sort({ createdAt: -1 })
        .limit(req.body.limit)
        .skip((req.body.page - 1) * req.body.limit),
      Noti.countDocuments({
        mno: req.body.memberNo,
      }),
    ]);
    res.json(notiLogs);
    res.set('Last-Page', Math.ceil(notiLogCount / req.body.limit));
  } catch (err) {
    console.error(err);
    res.status(403).send(err);
    next(err);
  }
};

export const notReadNotiCount = async (req, res, next) => {
  try {
    const count = Noti.countDocuments({
      mno: req.body.memberNo,
      noti_state: 0,
    });
    res.json(count);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    next(error);
  }
};

export const updateNotiState = async (req, res, next) => {
  try {
    const result = Noti.updateOne(
      { _id: req.body._id },
      { noti_state: req.body.notiState }
    );
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    next(error);
  }
};

export const updateAllNotiState = async (req, res, next) => {
  try {
    const result = Noti.updateMany(
      { mno: req.body.memberNo },
      { noti_state: req.body.notiState }
    );
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    next(error);
  }
};
