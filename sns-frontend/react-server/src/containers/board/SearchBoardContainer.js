import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, searchBoards } from '../../modules/board';
import Search from '../../components/common/Search';


const SearchBoardContainer = () => {
  const dispatch = useDispatch();
  const { searchTxt } = useSelector(({ board }) => ({
    searchTxt: board.searchTxt,
  }));

  const [category, setCategory] = useState(1);

  const onSubmitSearch = () => {
    // category 값을 함께 전달
    dispatch(searchBoards({ category, searchTxt }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({ key: name, value }));
  };

  return (
      <Search
          title="🔍️ 게시글 찾기"
          category={category}
          searchTxt={searchTxt}
          onSubmitSearch={onSubmitSearch}
          placeholder="제목,내용,작성자를 입력하세요"
          onChange={onChange}
      />
  );
};

export default SearchBoardContainer;
