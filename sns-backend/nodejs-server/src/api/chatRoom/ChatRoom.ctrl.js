import { redisClient } from '../../redis';
import Chat from '../../schemas/chat';
import Room from '../../schemas/room';
import User from '../../schemas/user';

export const roomList = async (req, res, next) => {
  try {
    const loginUser = await User.findOne({ mno: req.params.mno });

    // loginUser와 일치하는 mno를 가진 User 객체가 속한 room을 찾음
    const findRooms = await Room.find({
      users: loginUser._id, // loginUser의 _id와 일치하는 user를 가진 room을 찾음
    })
      .sort({ updatedAt: -1 })
      .populate('users'); // 각 room의 users 필드를 populate하여 사용자 정보를 가져옴

    res.json(findRooms);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const enterRoom = async (req, res, next) => {
  try {
    const userNo = await redisClient.get(req.cookies['sessionId']);
    let user1 = await User.findOne({ mno: req.query.mno1 });
    let user2 = await User.findOne({ mno: req.query.mno2 });
    console.log(req.query.mno1);
    console.log(req.query.mno2);
    if (userNo != req.query.mno1 && userNo != req.query.mno2) {
      res.status(403).end();
      return;
    }

    let room = await Room.findOne({
      users: { $all: [user1._id, user2._id] },
    }).populate('users');

    if (!room) {
      room = await Room.create({
        users: [user1._id, user2._id],
      });
      room.populate('users');
      // const io = req.app.get('io');
      // io.of('/room').emit('newRoom', room);
    }
    let chats = await Chat.find({ room: room })
      .sort({ _id: -1 })
      .limit(req.query.limit)
      .skip((req.query.page - 1) * req.query.limit)
      .populate('user');

    if (room && chats) {
      const roomAndChats = { room, chats: chats.reverse() };
      res.json(roomAndChats);
    }
  } catch (error) {
    res.status(403);
    console.error(error);
    return next(error);
  }
};

export const loadBeforeChats = async (req, res, next) => {
  try {
    const userNo = await redisClient.get(req.cookies['sessionId']);
    if (userNo != req.query.mno1 && userNo != req.query.mno2) {
      res.status(403).end();
      return;
    }
    let room = await Room.findOne({
      users: { $all: [req.query.mno1, req.query.mno2] },
    });
    if (room._id != req.query.roomId) {
      res.status(403).end();
      return;
    }

    let chats = await Chat.find({ room: req.query.roomId })
      .sort({ _id: -1 })
      .limit(req.query.limit)
      .skip((req.query.page - 1) * req.query.limit)
      .populate('user');

    res.json({
      beforeChats: chats.reverse(),
      nextPage: parseInt(req.query.page) + 1,
    });
  } catch (error) {
    res.status(403);
    console.error(error);
    return next(error);
  }
};

export const removeRoom = async (req, res, next) => {
  try {
    await Room.deleteOne({ _id: req.params.id });
    await Chat.deleteMany({ room: req.params.id });
    res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const sendChat = async (req, res, next) => {
  try {
    const userNo = await redisClient.get(req.cookies['sessionId']);
    const sendUser = await User.findOne({ mno: userNo });
    const roomId = req.params.roomId;

    const chat = await Chat.create({
      room: roomId,
      user: sendUser._id,
      chat: req.body.chatTxt,
      files: req.body.fileUrl,
    });
    chat.user = sendUser;
    req.app.get('io').of('/chat').to(roomId).emit('chat', { chat });
    res.json(chat);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
    return next(error);
  }
};

export const sendChatBySocket = async (data) => {
  try {
    const userNo = await redisClient.get(data.cookies['sessionId']);
    const sendUser = await User.findOne({ mno: userNo });
    const roomId = data.body.roomId;

    const chat = await Chat.create({
      room: roomId,
      user: sendUser._id,
      chat: data.body.chatTxt,
      files: data.body.fileUrl,
    });
    chat.user = sendUser;
    data.ioOfChat.to(roomId).emit('chat', { chat });
  } catch (error) {
    console.error(error);
    return;
  }
};
