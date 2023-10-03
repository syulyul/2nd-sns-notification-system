import mongoose from "mongoose";

const { Schema } = mongoose;
const roomSchema = new Schema({
  title: { // 방 제목
    type: String,
    required: true,
  },
  createdAt: { // 생성 시간
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
