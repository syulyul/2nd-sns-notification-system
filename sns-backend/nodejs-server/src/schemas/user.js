import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  mno: {
    // 사용자 고유 번호
    type: Number,
    required: true,
  },
  nick: {
    // 사용자 닉네임
    type: String,
    required: true,
  },
  photo: {
    // 사용자 사진
    type: String,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
