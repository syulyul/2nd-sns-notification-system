import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, searchMembers } from '../../modules/myPage';
import SearchUserComponent from '../../components/myPage/SearchUserComponent';

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
    <SearchUserComponent
      searchTxt={searchTxt}
      onSubmitSearch={onSubmitSearch}
      onChange={onChange}
    />
  );
};

export default SearchUserContainer;
