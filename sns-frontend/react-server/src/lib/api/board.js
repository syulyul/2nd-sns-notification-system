import springClient from './springClient';

// boardform
export const form = ({ formData }) =>
  springClient.post('board/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// boardlist
export const list = (category) =>
  springClient.get(`board/list?category=${category}`);

// boarddetail
export const detail = ({ category, boardNo }) =>
  springClient.get(`board/detail?category=${category}&boardNo=${boardNo}`);

//댓글
export const addComment = (boardComment) =>
    springClient.post('/board/addComment', boardComment);

// 게시글 수정
export const updatePost = ({ id, formData }) =>
  springClient.put(`board/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// 게시글 삭제
export const deletePost = (postId) => springClient.delete(`board/${postId}`);
