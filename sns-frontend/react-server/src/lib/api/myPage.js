import client from './client';

export const list = (userNo) => client.get(`/spring/myPage/${userNo}`);