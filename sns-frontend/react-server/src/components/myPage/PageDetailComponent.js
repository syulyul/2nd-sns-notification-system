import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import Button from '../common/Button';
import MyPageTemplate from './MyPageTemplate';

const BoardListTable = styled.table`
  border-collapse: collapse;
  width: 80%;
  background-color: white;
  /border: 1px solid #ddd;
`;

const TableRow = styled.tr`

  &:hover {
    background-color: #ccc;
    opacity: 0.9;
    cursor: pointer;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  text-align: center;
  //border: 1px solid #ddd;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: center;
  background-color: #f2f2f2;
  //border: 1px solid #ddd;
  width: 200px;
`;

const ProfileAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfilePicture = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0px;
`;

const ProfilePictureImg = styled.img`
  width: 100%;
  height: auto;
  margin-right: 8px;
`;

const TitleTableCell = styled(TableHeaderCell)`
  width: 600px; 
`;

const LikesTableCell = styled(TableHeaderCell)`
  width: 100px;
`;

const ViewCountTableCell = styled(TableHeaderCell)`
  width: 100px;
`;

const CommentListTable = styled.table`
  border-collapse: collapse;
  width: 80%;
  background-color: white;
`;

const CommentTableRow = styled.tr`
  &:hover {
    background-color: #ccc;
    opacity: 0.9;
    cursor: pointer;
  }
`;

const CommentTableCell = styled.td`
  padding: 15px;
  text-align: center;
`;

const CommentTableHeaderCell = styled.th`
  padding: 10px;
  text-align: center;
  background-color: #f2f2f2;
  width: 200px;
`;

const CommentTitleHeaderCell = styled.th`
  width: 800px;
  background-color: #f2f2f2;
`;

const ToggleButton = styled.button`
  margin: 10px;
  background-color: transparent; /* 배경색을 투명으로 설정 */
  border: none; /* 테두리 제거 */
`;

const PageDetailComponent = ({ myBoardList, myCommentList, show }) => {
  const location = useLocation();
  const { userNo } = useParams(); // URL 파라미터에서 userNo를 추출
  const queryParams = new URLSearchParams(location.search);
  const [isBoardListOpen, setIsBoardListOpen] = useState(false);
  const [isCommentListOpen, setIsCommentListOpen] = useState(false);

  // URL이 /myPage/ 일때만 게시글과 댓글 섹션을 렌더링
  const shouldRenderSections = show === 'boardList';

  // 날짜 포맷 변경 함수 (시간 삭제)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // 시간을 포함하지 않는 날짜 형식으로 변경
  };

  const toggleBoardList = () => {
    setIsBoardListOpen(!isBoardListOpen);
  };

  const toggleCommentList = () => {
    setIsCommentListOpen(!isCommentListOpen);
  };

  return (
      <>
        <MyPageTemplate>
          {shouldRenderSections && (
              <div className="boardListBox" data-th-unless="">
                <div>
                  <h2>
                    🌱 내가 쓴 게시글
                    <ToggleButton onClick={toggleBoardList}>
                      {isBoardListOpen ? '▲' : '▼'}
                    </ToggleButton>
                  </h2>
                </div>
                {isBoardListOpen && (
                <BoardListTable>
                  <thead>
                    <TableRow>
                      <TableHeaderCell>작성자🌱</TableHeaderCell>
                      <TitleTableCell>제목🌱</TitleTableCell>
                      <LikesTableCell>좋아요🌱</LikesTableCell>
                      <ViewCountTableCell>조회수🌱</ViewCountTableCell>
                      <TableHeaderCell>등록일🌱</TableHeaderCell>
                    </TableRow>
                  </thead>
                  <tbody>
                    {myBoardList &&
                        myBoardList.map((board) => (
                            <TableRow key={board.id}>
                              <TableCell>
                                <ProfileAuthor>
                                  <ProfilePicture>
                                    {board.writer.photo ? (
                                        <ProfilePictureImg src="/images/avatar.png" alt="기본 프로필 사진" />
                                    ) : (
                                        <a href={`https://kr.object.ncloudstorage.com/bitcamp-nc7-bucket-14/sns_member/${board.writer.photo}`}>
                                          <ProfilePictureImg
                                              className="profile-image"
                                              alt="프로필 사진"
                                              src={`http://gjoxpfbmymto19010706.cdn.ntruss.com/sns_member/${board.writer.photo}?type=f&w=270&h=270&faceopt=true&ttype=jpg`}
                                          />
                                        </a>
                                    )}
                                  </ProfilePicture>
                                  <span>{board.writer.nick}</span>
                                </ProfileAuthor>
                              </TableCell>
                              <TableCell>
                                <a href={`/board/detail/${board.category}/${board.no}`}>
                                  {board.title ? board.title : '제목없음'}
                                </a>
                              </TableCell>
                              <TableCell>{board.likes}</TableCell>
                              <TableCell>{board.viewCount}</TableCell>
                              <TableCell>{formatDate(board.createdAt)}</TableCell>
                            </TableRow>
                        ))}
                  </tbody>
                </BoardListTable>
                )}
                <div>
                  <h2>
                    🌱 내가 쓴 댓글
                    <ToggleButton onClick={toggleCommentList}>
                      {isCommentListOpen ? '▲' : '▼'}
                    </ToggleButton>
                  </h2>
                </div>
                {isCommentListOpen && (
                <CommentListTable>
                  <thead>
                    <tr>
                      <CommentTableHeaderCell>작성자🌱</CommentTableHeaderCell>
                      <CommentTitleHeaderCell>내용🌱</CommentTitleHeaderCell>
                      <CommentTableHeaderCell>등록일🌱</CommentTableHeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {myCommentList &&
                        myCommentList.map((boardComment) => (
                            <CommentTableRow key={boardComment.id}>
                              <CommentTableCell>
                                <ProfileAuthor>
                                  <ProfilePicture>
                                    {boardComment.writer.photo ? (
                                        <img
                                            alt="기본 프로필 사진"
                                            src="/images/avatar.png"
                                        />
                                    ) : (
                                        <a
                                            href={`https://kr.object.ncloudstorage.com/bitcamp-nc7-bucket-14/sns_member/${boardComment.writer.photo}`}
                                        >
                                          <img
                                              className="profile-image"
                                              alt="프로필 사진"
                                              src={`http://gjoxpfbmymto19010706.cdn.ntruss.com/sns_member/${boardComment.writer.photo}?type=f&w=270&h=270&faceopt=true&ttype=jpg`}
                                          />
                                        </a>
                                    )}
                                  </ProfilePicture>
                                  <span>{boardComment.writer.nick}</span>
                                </ProfileAuthor>
                              </CommentTableCell>
                              <CommentTableCell>
                                <a href={`/board/detail/1/${boardComment.boardNo}`}>
                                  {boardComment.content ? boardComment.content : '내용없음'}
                                </a>
                              </CommentTableCell>
                              <CommentTableCell>
                                {new Date(boardComment.createdAt).toLocaleDateString('ko-KR')}
                              </CommentTableCell>
                            </CommentTableRow>
                        ))}
                  </tbody>
                </CommentListTable>
                )}
              </div>
          )}
        </MyPageTemplate>
      </>
  );
};

export default PageDetailComponent;