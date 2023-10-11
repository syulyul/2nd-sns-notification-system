import springClient from './springClient';

export const post = ({ mpno, title, content, writer }) =>
    springClient.post('guestBook/add', { mpno, title, content, writer, });

export const list = (no) => springClient.get(`/guestBook/${no}`);