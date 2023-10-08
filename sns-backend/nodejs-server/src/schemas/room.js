import mongoose from "mongoose";

const { Schema } = mongoose;
const roomSchema = new Schema({
  title : { // 방 제목(회원 닉네임)
    type: String,
    required: true,
    ref: 'User',
  },
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
