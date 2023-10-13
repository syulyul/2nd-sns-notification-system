import mongoose from 'mongoose';

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const notiSchema = new Schema({
  mno: {
    type: Number,
    required: true,
  },
  ntno: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  noti_state: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: { // 채팅을 한 사람
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  fcmToken: {
    type: String,
    required: true,

  }
});

const Noti = mongoose.model('Noti', notiSchema);
export default Noti;
