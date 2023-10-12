import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import Button from '../common/Button';
import MyPageTemplate from './MyPageTemplate';

const DetailForm = styled.div`
  .between {
    display: flex;
    justify-content: space-between;
  }

  .userField {
    display: inline-block;
    height: 30px;
    margin: 0 1rem;
    text-align: center;
  }

  /* 친구 검색 버튼 */
  .search_btn {
    font-size: 20px;
    background-color: #426b1f;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    white-space: nowrap;
    text-decoration-line: none;
    margin: 20px 20px 20px 10px;
  }

  /* 팔로잉, 팔로워 리스트 관련 */
  .list_form {
    width: 140%;
    /*padding: 20px;*/
    background-color: #fff;
    border-radius: 5px; /* 박스를 둥글게 만들기 위해 추가 */
    /*margin: -30px;*/
  }

  /* 팔로잉, 팔로워 목록 관련 */
  .form-list {
    width: 500px;
    margin-top: -50px;
    margin-left: 250px; /* 가운데 정렬을 위해 수정 */
    position: relative; /* 부모 위치 기준으로 설정하기 위해 추가 */
  }
`;
const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 10px;
  border-radius: 3px;
  outline: none;
  padding: 0px 0px 5px 5px;
  height: 60px;
  width: 420px;

  ::placeholder {
    color: #3a3a3a;
`;

// SubmitButton을 수정하여 styled(Button)으로 정의
const SubmitButton = styled(Button)`
  width: 90%;
  padding: 7px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  background-color: #426b1f;
  cursor: pointer;
  outline: none;
`;

const PageDetailComponent = ({
  onSubmitSearch,
  myBoardList,
  myCommentList,
  show,
}) => {
  const location = useLocation();
  const { userNo } = useParams(); // URL 파라미터에서 userNo를 추출
  const queryParams = new URLSearchParams(location.search);

  // URL이 /myPage/ 일때만 게시글과 댓글 섹션을 렌더링
  const shouldRenderSections = show !== 'following' && show !== 'follower';
  return (
    <MyPageTemplate>
      <div data-th-replace="header :: header"></div>
      <div style={{ marginBottom: '70px' }}></div>
      <DetailForm>
        <StyledInput
          type="text"
          name="keyword"
          placeholder="이름을 입력해주세요."
        />
        <StyledInput type="hidden" name="show" value="searchMembers" />
        <label className="search_btn">
          <SubmitButton type="submit" onClick={onSubmitSearch}>
            검색
          </SubmitButton>
        </label>
        <label className="memberInfo">
          <StyledInput type="hidden" name="myPageNo" value="" />
        </label>
        {shouldRenderSections && (
          <div className="boardListBox" data-th-unless="">
            <div>
              <h2>🌱 내가 쓴 게시글 </h2>
            </div>
            <thead>
              <tr>
                <th>작성자🌱</th>
                <th>제목🌱</th>
                <th>좋아요🌱</th>
                <th>조회수🌱</th>
                <th>등록일🌱</th>
              </tr>
            </thead>
            <tbody>
              {myBoardList &&
                myBoardList.map((board) => (
                  <tr data-th-each="board : ${myboardList}">
                    <td>
                      <div class="profile-author">
                        <div class="profile-picture">
                          {board.writer.photo ? (
                            <img
                              alt="기본 프로필 사진"
                              src="/images/avatar.png"
                            />
                          ) : (
                            <a
                              href={`https://kr.object.ncloudstorage.com/bitcamp-nc7-bucket-14/sns_member/${board.writer.photo}`}
                            >
                              <img
                                class="profile-image"
                                alt="프로필 사진"
                                src={`http://gjoxpfbmymto19010706.cdn.ntruss.com/sns_member/${board.writer.photo}?type=f&w=270&h=270&faceopt=true&ttype=jpg`}
                              />
                            </a>
                          )}
                        </div>
                        <span>{board.writer.nick}</span>
                      </div>
                    </td>
                    <td>
                      <a href={`/board/detail/${board.category}/${board.no}`}>
                        {board.title ? board.title : '제목없음'}
                      </a>
                    </td>
                    <td>{board.likes}</td>
                    <td>{board.viewCount}</td>
                    <td>{new Date(board.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
            <div>
              <h2>🌱 내가 쓴 댓글 </h2>
            </div>
            <thead>
              <tr>
                <th>작성자🌱</th>
                <th>내용🌱</th>
                <th>등록일🌱</th>
              </tr>
            </thead>
            <tbody>
              {myCommentList &&
                myCommentList.map((comment) => (
                  <>
                    <tr>
                      <td>
                        <div class="profile-author">
                          <div class="profile-picture">
                            {comment.writer.photo ? (
                              <img
                                alt="기본 프로필 사진"
                                src="/images/avatar.png"
                              />
                            ) : (
                              <a
                                href={`https://kr.object.ncloudstorage.com/bitcamp-nc7-bucket-14/sns_member/${comment.writer.photo}`}
                              >
                                <img
                                  class="profile-image"
                                  alt="프로필 사진"
                                  src={`http://gjoxpfbmymto19010706.cdn.ntruss.com/sns_member/${comment.writer.photo}?type=f&w=270&h=270&faceopt=true&ttype=jpg`}
                                />
                              </a>
                            )}
                          </div>
                          <span>{comment.writer.nick}</span>
                        </div>
                      </td>
                      <td>
                        <a href={'/board/detail/1/' + comment.boardNo}>
                          {comment.content ? comment.content : '내용없음'}
                        </a>
                      </td>
                      <td>{new Date(comment.createdAt).toLocaleString()}</td>
                    </tr>
                  </>
                ))}
            </tbody>
          </div>
        )}
      </DetailForm>
    </MyPageTemplate>
  );
};

export default PageDetailComponent;
