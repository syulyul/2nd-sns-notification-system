import client from './client';
export const info = ({ visitCount, photo, nick, no }) =>
    client.post('/spring/myPage/{no}/info', { visitCount, photo, nick, no });