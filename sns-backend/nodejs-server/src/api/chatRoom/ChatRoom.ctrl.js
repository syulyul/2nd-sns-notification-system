import Chat from "../../schemas/chat";
import Room from "../../schemas/room";

export const Roomlist = async (req, res, next) => {
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
    const room = await Room.findOne({ _id: req.params.id });
    if (!room) {
      const createRoom = async (req, res, next) => {
        try {
          const newRoom = await Room.create({
            title : req.body.nick,
          });
          const io = req.app.get("io");
          io.of("/room").emit("newRoom", newRoom);
          res.redirect(`/room/${newRoom._id}`);
        } catch (error) {
          console.error(error);
          next(error);
        }
      };
    }
    
    // 채팅방에 참여중인 사용자들의 nick을 사용하여 title 설정
    const usersInRoom = []; // 채팅방에 참여중인 사용자 목록을 가져오는 로직이 필요
    const userNicknames = usersInRoom.map((user) => user.nick);
    const title = userNicknames.join(", "); // 사용자들의 nick을 쉼표로 구분하여 표시
    
    return res.render('chat', {
      room,
      title,
      chats: [],
      user: req.session.user,
    });
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