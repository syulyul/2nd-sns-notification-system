import mongoose from 'mongoose';

const { Schema } = mongoose;

const roomSchema = new Schema({
  users: [Number],
  updatedAt: {
    // 채팅방 생성 시간
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
