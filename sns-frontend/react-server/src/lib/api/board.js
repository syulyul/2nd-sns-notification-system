import client from './client';

// 게시글 작성
export const writePost = ({ title, content, files, category }) =>
    client.post('/spring/board/add', {
      title,
      content,
      files,
      category,
    });

// 게시글 조회
export const readPost = (postId) =>
    client.get(`/spring/board/${postId}`);

// 게시글 수정
export const updatePost = ({ id, title, content, files, category }) =>
    client.put(`/spring/board/${id}`, {
      title,
      content,
      files,
      category,
    });

// 게시글 삭제
export const deletePost = (postId) =>
    client.delete(`/spring/board/${postId}`);

