import mongoose from "mongoose";

const mongodbConnect = () => {
  const { NODE_ENV, MONGO_URI, MONGODB_USER, MONGODB_PASS } = process.env;

  console.log("MONGODB연결 시작");
  const MONGO_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGO_URI}?directConnection=true`;
  if (NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose
    .connect(MONGO_URL, {
      dbName: "",
    })
    .then(() => {
      console.log("MongoDB 연결성공");
    })
    .catch((err) => {
      console.error("@mongoDB 연결 에러발생@", err);
    });
};

mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  mongodbConnect();
});

export default mongodbConnect;
