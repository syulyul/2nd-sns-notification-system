import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, searchMembers } from '../../modules/myPage';
import Search from '../../components/common/Search';


const SearchUserContainer = () => {
  const dispatch = useDispatch();
  const { searchTxt } = useSelector(({ myPage }) => ({
    searchTxt: myPage.searchTxt,
  }));

  const onSubmitSearch = () => {
    dispatch(searchMembers({ searchTxt }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({ key: name, value }));
  };

  return (
    <Search
      title="🔍️ 친구 찾기"
      searchTxt={searchTxt}
      onSubmitSearch={onSubmitSearch}
      placeholder="이름을 입력하세요"
      onChange={onChange}
    />
  );
};

export default SearchUserContainer;
