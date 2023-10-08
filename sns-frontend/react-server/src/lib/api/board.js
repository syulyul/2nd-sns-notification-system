import client from './client';

// 게시글 작성
export const writePost = ({ title, content, files, category }) =>
    client.post('/spring/board/add', {
      title,
      content,
      files,
      category,
    })

// boardlist
export const list = (category) =>
    client.get(`/spring/board/list?category=${category}`);

// 게시글 수정
export const updatePost = ({ id, title, content, files, category }) =>
  client.put(`/spring/board/${id}`, {
    title,
    content,
    files,
    category,
  });

// 게시글 삭제
export const deletePost = (postId) => client.delete(`/spring/board/${postId}`);
