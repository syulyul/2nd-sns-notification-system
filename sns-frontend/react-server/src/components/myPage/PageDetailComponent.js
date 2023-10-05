import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
    background-color: #426B1F;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    white-space : nowrap;
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
    margin-top:-50px;
    margin-left:250px; /* 가운데 정렬을 위해 수정 */
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

const PageDetailComponent = ({ onSubmit }) => {
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
          <StyledInput
              type="hidden"
              name="show"
              value="searchMembers"
          />
          <label className="search_btn">
            <SubmitButton type="submit" onClick={onSubmit}>
              검색
            </SubmitButton>
          </label>
          <label className="memberInfo">
            <StyledInput
                type="hidden"
                name="myPageNo"
                value=""
            />
          </label>
          <div className="boardListBox" data-th-unless="">

            <div><h2>🌱 내가 쓴 게시글 </h2></div>
            <div data-th-replace="board/mylist :: myboardList" style={{ marginTop: '20px' }}>
              내 게시글
            </div>
            <div>
              <h2>🌱 내가 쓴 댓글 </h2>
            </div>
            <div data-th-replace="board/mycommentlist :: mycommentList" style={{ marginTop: '20px' }}>
              내 댓글
            </div>
          </div>
          <div className="form-list">
            <div data-th-replace="myPage/followList :: followList"></div>
          </div>
        </DetailForm>
      </MyPageTemplate>
  );
};

export default PageDetailComponent;