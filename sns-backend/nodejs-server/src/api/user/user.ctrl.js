import User from '../../schemas/user';

export const addUser = async (req, res, next) => {
  try {
    const user = await User.create({
      mno: req.body.no,
      nick: req.body.nick,
      rooms: [],
    });
    return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(403).send(err);
    return next(err);
  }
};
