import client from './springClient';

export const list = (userNo) => client.get(`/myPage/${userNo}`);