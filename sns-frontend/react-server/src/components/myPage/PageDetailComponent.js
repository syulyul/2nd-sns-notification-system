import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import Button from '../common/Button';
import MyPageTemplate from './MyPageTemplate';

const PageDetailComponent = ({ myBoardList, myCommentList, show }) => {
  const location = useLocation();
  const { userNo } = useParams(); // URL 파라미터에서 userNo를 추출
  const queryParams = new URLSearchParams(location.search);

  // URL이 /myPage/ 일때만 게시글과 댓글 섹션을 렌더링
  const shouldRenderSections = show === 'boardList';
  return (
    <MyPageTemplate>
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
    </MyPageTemplate>
  );
};

export default PageDetailComponent;
