import mongoose from "mongoose";

const { Schema } = mongoose;
const notiSchema = new Schema ({
  nlno: {
    type: Number,
    required: true,
  },
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
});

const Noti = mongoose.model("Noti", notiSchema);
export default Noti;