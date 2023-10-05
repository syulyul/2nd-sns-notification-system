import React, { useState } from 'react';
import BoardListComponent from '../../components/board/BoardListComponent';

const BoardListContainer = () => {
  const [boards, setBoards] = useState([
    { no: 1, title: '임시 제목 1', writer: { nick: '작성자1', photo: null }, likes: 10, viewCount: 100, createdAt: new Date() },
    { no: 2, title: '임시 제목 2', writer: { nick: '작성자2', photo: null }, likes: 15, viewCount: 120, createdAt: new Date() },
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(boards.length / 10);

  const onSearch = (keyword) => {
    console.log(`Searching for ${keyword}`);
  };

  const onWriteClick = () => {
    console.log('글쓰기 버튼 클릭');
  };

  const onMainClick = () => {
    console.log('메인 버튼 클릭');
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
      <BoardListComponent
          boards={boards}
          onSearch={onSearch}
          onWriteClick={onWriteClick}
          onMainClick={onMainClick}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
      />
  );
};

export default BoardListContainer;
