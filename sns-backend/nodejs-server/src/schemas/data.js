import mongoose from 'mongoose';
import Chat from './chat';
import Room from './room';
import User from './user';

// 테스트 데이터 삽입 함수
const insertTestData = async () => {
  const testUserData = [
    {
      mno: 1,
      nick: '팡파레',
      photo: null,
    },
    {
      mno: 2,
      nick: '지나가율',
      photo: 'cdb26d73-6a57-4284-b48b-3594f0ca24af',
    },
    {
      mno: 3,
      nick: '연궁이',
      photo: 'f4b4a449-cecb-471d-99cc-c6742ec53fff',
    },
    {
      mno: 4,
      nick: '호빵맨',
      photo: '9a1455a7-a5c6-4954-856f-4e5162633867',
    },
    {
      mno: 5,
      nick: '산준으로',
      photo: '5a4bf687-e335-4105-b922-a55e8d06e1aa',
    },
    {
      mno: 6,
      nick: '래시포드',
      photo: '773d9c74-a99b-4992-bdb6-2a7130a2ef49',
    },
  ];

  const testRoomData = [
    {
      users: [], // 사용자 ID 배열을 추가해야 함
      updatedAt: new Date(),
    },
    {
      users: [],
      updatedAt: new Date(),
    },
  ];

  try {
    // 사용자 데이터 삽입
    const users = await User.create(testUserData);
    console.log('Inserted users:', users);

    // 방(Room) 데이터 삽입
    testRoomData[0].users = [users[0]._id, users[1]._id];
    testRoomData[1].users = [users[1]._id, users[2]._id];
    const rooms = await Room.create(testRoomData);
    console.log('Inserted rooms:', rooms);

    // 테스트 데이터 정의
    const testChatData = [
      {
        room: rooms[0]._id, // 대상 채팅방 ID
        user: users[1]._id, // 사용자 ID
        chat: '팡고리듬님.',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[1]._id,
        chat: '이거 어떻게 하는거에요?',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[0]._id,
        chat: '라고 물으신다면!',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[1]._id,
        chat: '대답해 드리는게 인지상정',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[0]._id,
        chat: '이 세계의 파괴를 막기 위해',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[1]._id,
        chat: '이 세계의 평화를 지키기 위해',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[0]._id,
        chat: '사랑과 진실, 어둠을 뿌리고 다니는',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[1]._id,
        chat: '포켓몬의 감초, 귀염둥이 악당',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[0]._id,
        chat: '나, 로사',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[1]._id,
        chat: '나, 로이',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[0]._id,
        chat: '우주를 뛰어다니는 우리 로켓단들에겐',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[1]._id,
        chat: '아름다운 미래, 밝은 내일이 기다리고 있다.',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[0]._id,
        chat: '난 나옹이다옹!',
        translated: [],
        files: null,
      },
      {
        room: rooms[0]._id,
        user: users[1]._id,
        chat: '마자~용!',
        translated: [],
        files: null,
      },
      {
        room: rooms[1]._id,
        user: users[2]._id,
        chat: '뭐해?',
        translated: [],
        files: null,
      },
      {
        room: rooms[1]._id,
        user: users[1]._id,
        chat: '일하고 있어ㅠㅠ',
        translated: [],
        files: null,
      },
      {
        room: rooms[1]._id,
        user: users[2]._id,
        chat: '나도ㅠㅠ',
        translated: [],
        files: null,
      },
      {
        room: rooms[1]._id,
        user: users[1]._id,
        chat: '빨리 퇴근하고 싶다!',
        translated: [],
        files: null,
      },
      {
        room: rooms[1]._id,
        user: users[2]._id,
        chat: '나도ㅠㅠ 퇴근하고 맛있는 거 먹자!',
        translated: [],
        files: null,
      },
      {
        room: rooms[1]._id,
        user: users[1]._id,
        chat: '좋아!! 뭐 먹을까????',
        translated: [],
        files: null,
      },
      {
        room: rooms[1]._id,
        user: users[2]._id,
        chat: '치킨 먹자!!!!',
        translated: [],
        files: null,
      },
      {
        room: rooms[1]._id,
        user: users[1]._id,
        chat: '그래!!! 퇴근 하고 만나!!',
        translated: [],
        files: null,
      },
    ];

    // Chat 데이터 삽입
    const chats = await Chat.create(testChatData);
    console.log('Inserted chats:', chats);
  } catch (error) {
    console.error('Error inserting test data:', error);
  } finally {
    // MongoDB 연결 종료
    mongoose.connection.close();
  }
};

export default insertTestData;
