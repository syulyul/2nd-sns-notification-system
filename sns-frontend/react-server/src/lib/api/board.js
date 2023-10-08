import springClient from './springClient';

// 게시글 작성
export const writePost = ({ title, content, files, category }) =>
  springClient.post('board/add', {
    title,
    content,
    files,
    category,
  });

// boardlist
export const list = (category) =>
  springClient.get(`board/list?category=${category}`);

// 게시글 수정
export const updatePost = ({ id, title, content, files, category }) =>
  springClient.put(`board/${id}`, {
    title,
    content,
    files,
    category,
  });

// 게시글 삭제
export const deletePost = (postId) => springClient.delete(`board/${postId}`);
