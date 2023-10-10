import springClient from './springClient';

export const list = (userNo) => springClient.get(`/guestBook/${userNo}`);