import User from '../../schemas/user';

export const addUser = async (req, res, next) => {
  try {
    const user = await User.create({
      mno: req.body.no,
      name: req.body.name,
      nick: req.body.nick,
      photo: req.body.photo,
      rooms: [],
    });
    return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(403).send(err);
    return next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.updateOne(
      { mno: req.body.no },
      {
        mno: req.body.no,
        name: req.body.name,
        nick: req.body.nick,
        photo: req.body.photo,
        rooms: [],
      }
    );
    return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(403).send(err);
    return next(err);
  }
};
