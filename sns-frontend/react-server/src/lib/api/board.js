import springClient from './springClient';
import qs from 'qs';

// boardform
export const form = ({ formData }) =>
  springClient.post('board/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// boardlist
export const list = async ({ category, limit, page}) => {
  const queryString = qs.stringify({ limit, page });
  return await springClient.get(`/board/list?category=${category}&${queryString}`);
};


// boarddetail
export const detail = ({ category, boardNo }) =>
  springClient.get(`board/detail?category=${category}&boardNo=${boardNo}`);


// 게시글삭제
export const deleteBoard = ({ category, boardNo }) =>
    springClient.delete(`board/delete/${boardNo}`, { params: { category } });

// 댓글작성
export const addComment = (commentData) =>
    springClient.post('board/addComment', commentData);

//댓글삭제
export const deleteComment = ({ commentNo, boardNo }) =>
    springClient.delete(`/board/deleteComment/${boardNo}/${commentNo}`);

//좋아요
export const likeBoard = (boardNo) =>
    springClient.post(`/board/like`, null, { params: { boardNo } });

//좋아요취소
// 좋아요 취소
export const unlikeBoard = (boardNo) =>
    springClient.post(`/board/unlike`, null, { params: { boardNo } });