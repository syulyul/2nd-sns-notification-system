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

// 게시글 수정
export const updatePost = ({ id, title, content, files, category }) =>
  springClient.put(
    `board/${id}`,
    {
      title,
      content,
      category,
    },
    files,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

// 게시글 삭제
export const deletePost = (postId) => springClient.delete(`board/${postId}`);
