import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
`;

const SearchBox = styled.div`
    margin-top: 20px;
    text-align: left;
`;

const SearchInput = styled.input`
    padding: 5px;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
`;

const Button = styled.button`
    background-color: #426B1F;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 4px;
    margin-right: ${props => props.main ? '300px' : props.write ? '10px' : '0'};
    &:hover {
        background-color: #426B1F;
    }
`;

const BoardTable = styled.table`
    border-collapse: collapse;
    width: 1500px;
    margin: 1rem auto;
    background-color: white;
    border: 1px solid #ddd;

    th, td {
        padding: 8px;
        text-align: center;
        border: 1px solid #ddd;
        border-left: none;
        border-right: none;
    }

    th {
        background-color: #f2f2f2;
    }

    tbody tr:hover {
        background-color: #ccc;
        opacity: 0.9;
        cursor: pointer;
    }

    th:nth-child(1), td:nth-child(1) {
        width: 10%;
    }

    th:nth-child(2), td:nth-child(2) {
        width: 50%;
    }
`;

const ProfilePicture = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
        height: auto;
    }
`;

const ProfileAuthor = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;

    a {
        margin: 0 5px;
        padding: 5px 10px;
        border-radius: 50%;
        text-decoration: none;
        color: black;
        background-color: #f2f2f2;

        &.active {
            background-color: #426B1F;
            color: white;
        }

        &:hover {
            background-color: #426B1F;
            color: white;
        }
    }
`;


const BoardListComponent = ({ boards, onSearch, onWriteClick, onMainClick, currentPage, totalPages, onPageChange }) => {
  return (
      <Container>
        <div data-th-replace="header :: header"></div>
        <div style={{ marginBottom: '100px' }}></div>

        <SearchBox>
          <form>
            <p>🔍️ 게시글 찾기
              <SearchInput type="text" placeholder="검색어를 입력해주세요." />
              <Button onClick={onSearch}>검색</Button>
            </p>
          </form>
        </SearchBox>

        <div style={{ textAlign: 'right', marginRight: '20px', marginTop: '-30px', marginBottom: '20px' }}>
          <Button write onClick={onWriteClick}>글쓰기</Button>
          <Button main onClick={onMainClick}>메인</Button>
        </div>

        <BoardTable>
          <thead>
            <tr>
              <th>번호🌱</th>
              <th>제목🌱</th>
              <th>작성자🌱</th>
              <th>좋아요🌱</th>
              <th>조회수🌱</th>
              <th>등록일🌱</th>
            </tr>
          </thead>
          <tbody>
            {boards.map(board => (
                <tr key={board.no}>
                  <td>{board.no}</td>
                  <td><a href={`/board/detail/${board.category}/${board.no}`}>{board.title || '제목없음'}</a></td>
                  <td>
                    <ProfileAuthor>
                      <ProfilePicture>
                        <img src={board.writer.photo || '/images/avatar.png'} alt="profile"/>
                      </ProfilePicture>
                      <a href={`/myPage/${board.writer.no}`}>{board.writer.nick}</a>
                    </ProfileAuthor>
                  </td>
                  <td>{board.likes}</td>
                  <td>{board.viewCount}</td>
                  <td>{new Date(board.createdAt).toLocaleDateString()}</td>
                </tr>
            ))}
          </tbody>
        </BoardTable>

        <Pagination>
          {Array.from({length: totalPages}).map((_, idx) => (
              <a
                  key={idx}
                  className={idx === currentPage ? 'active' : ''}
                  onClick={() => onPageChange(idx)}
              >
                {idx + 1}
              </a>
          ))}
        </Pagination>
        
        <div data-th-replace="footer :: footer"></div>
      </Container>
  );
};

export default BoardListComponent;
