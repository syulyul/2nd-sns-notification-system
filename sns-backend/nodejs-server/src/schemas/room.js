import mongoose from "mongoose";

const { Schema } = mongoose;

const roomSchema = new Schema({

  users: [Number],
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
