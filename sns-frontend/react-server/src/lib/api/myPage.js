import client from './client';
export const info = () =>
    client.get('/spring/myPage/{no}');