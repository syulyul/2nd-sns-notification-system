import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    margin-left: 20px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
    background-color: #426B1F;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
    border: none;  // 테두리 제거
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

const ActionButtonsContainer = styled.div`
  text-align: right;
  margin-right: 20px;
  margin-top: -30px;
  margin-bottom: 20px;
`;

const SearchButton = styled(Button)`
    margin-right: 10px;
`;

const MainButton = styled(Button)`
    margin-right: 500px;
`;

const BoardLink = styled.a`
    color: black;
    text-decoration: none;
`;

const AuthorLink = styled.a`
    text-decoration-line: none;
    color: black;
`;

const BoardListComponent = ({ boardListData, totalPages, currentPage, onPageChange }) => {
  return (
      <Container>
        <SearchBox>
          <form>
            <p>🔍️ 게시글 찾기
              <SearchInput type="text" placeholder="검색어를 입력해주세요." />
              <SearchButton>검색</SearchButton>
            </p>
          </form>
        </SearchBox>

        <ActionButtonsContainer>
          <Link to={`/board/form/1`}>
            <Button>글쓰기</Button>
          </Link>
          <MainButton>메인</MainButton>
        </ActionButtonsContainer>

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
            {boardListData && boardListData.map(board => (
                <tr key={board.no}>
                  <td>{board.no}</td>
                  <td><BoardLink href={`/board/detail/${board.category}/${board.no}`}>{board.title || '제목없음'}</BoardLink></td>
                  <td>
                    <ProfileAuthor>
                      <ProfilePicture>
                        <img src={board.writer.photo || '/images/avatar.png'} alt="profile"/>
                      </ProfilePicture>
                      <AuthorLink href={`/myPage/${board.writer.no}`}>{board.writer.nick}</AuthorLink>
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
      </Container>
  );
};

export default BoardListComponent;