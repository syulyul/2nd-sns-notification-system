import mongoose from "mongoose";

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const userSchema = new Schema ({
  mno: { // 사용자 고유 번호
    type: Number,
    required: true,
  },
  nick: { // 사용자 닉네임
    type: String,
    required: true,
  },
  rooms: [{ // 사용자가 참여하고 있는 채팅방 전체
    type: ObjectId,
    ref: 'Room',
  }],

});

const User = mongoose.model('User', userSchema);
export default User;