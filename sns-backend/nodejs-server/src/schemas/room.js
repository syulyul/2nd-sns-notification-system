import mongoose from 'mongoose';

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const roomSchema = new Schema({
  users: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  updatedAt: {
    // 채팅방 생성 시간
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
