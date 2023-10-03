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
  rooms: [{
    type: ObjectId,
    ref: 'Room',
  }],

});

const User = mongoose.model('User', userSchema);
export default User;