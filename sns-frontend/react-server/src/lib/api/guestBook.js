import springClient from './springClient';

export const post = ({ mno, mpno, title, content }) =>
    springClient.post('guestBook/add', { mno, mpno, title, content, });

export const list = (no) => springClient.get(`/guestBook/${no}`);