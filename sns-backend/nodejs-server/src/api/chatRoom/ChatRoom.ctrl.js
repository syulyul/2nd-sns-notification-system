import Chat from "../../schemas/chat";
import Room from "../../schemas/room";

export const roomList = async (req, res, next) => {
  try {
    const findRooms = await Room.find({});

    res.render('room')
    
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const enterRoom = async (req, res, next) => {
  try {
    let room = await Room.findOne({ _id: req.params.id });
    if (!room) {
      room = await Room.create({
            title : req.body.nick,
          });
          const io = req.app.get("io");
          io.of("/room").emit("newRoom", room);
          res.redirect(`/room/${room._id}`);
    };

  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const removeRoom = async (req, res, next) => {
  try {
    await Room.deleteOne ({ _id: req.params.id });
    await Chat.deleteMany ({ room: req.params.id });
    res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const sendChat = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    //console.log("수신테스트", ctx.request.body);
    const chat = await Chat.create({
      Room: roomId,
      User: req.state.user,
      chat: req.body.chatTxt,
      img: req.body.imgUrl,
    });
    req.app.get("io").of("/chat").to(roomId).emit("chat", { chat });
    res.json(chat);
  } catch (error) {
    console.error(error);
    next(error);
  }
};