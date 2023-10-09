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
    return res.json(notiLog);
  } catch (err) {
    console.error(err);
    res.status(403).send(err);
    return next(err);
  }
};

export const listNotiLog = async (req, res, next) => {
  console.log(req.query);
  try {
    console.log('요청이 왔다해');
    const [notiLogs, notiLogCount] = await Promise.all([
      Noti.find({ mno: req.params.memberNo })
        .sort({ createdAt: -1 })
        .limit(req.query.limit)
        .skip((req.query.page - 1) * req.query.limit),
      Noti.countDocuments({
        mno: req.params.memberNo,
      }),
    ]);

    res.set('Last-Page', Math.ceil(notiLogCount / req.query.limit));
    return res.json(notiLogs);
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
