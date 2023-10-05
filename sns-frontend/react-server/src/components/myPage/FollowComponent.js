import styled from 'styled-components';
import MyPageTemplate from './MyPageTemplate';

const FollowForm = styled.div`
  .pagination-link {
    display: inline-block;
    width: 36px; /* 너비 */
    height: 36px; /* 높이 */
    line-height: 36px; /* 텍스트 수직 정렬 */
    text-align: center; /* 텍스트 수평 정렬 */
    margin-right: 4px;
    border-radius: 50%; /* 동그라미 */
    background-color: #f2f2f2;
    text-decoration: none;
    color: black;
  }

  .pagination-link-active {
    background-color: #426B1F;
    color: white;
  }

  .pageLabel {
    margin-top : 60px;
    text-align: center;
  }

  /* 팔로잉, 팔로워 리스트 관련 */
  .memberListBox {
    margin-left:18px;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px; /* 박스를 둥글게 만들기 위해 추가 */
  }

  /* 팔로잉, 팔로워 목록 관련 */
  .memberItem {
    margin-top:0px;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    border-bottom: 1px solid #ccc; /* 부모 위치 기준으로 설정하기 위해 추가 */
  }
  .memberPhoto {
    height: 80px;
    width: 80px;
    border-radius: 50%;  /* 부모 위치 기준으로 설정하기 위해 추가 */
  }
  .toggleBox {
    display: none;
  }

  .checkedLabel {
    display: none;
  }

  .toggleBox:checked ~ .checkedLabel {
    display: inline-block;
  }

  .toggleBox:checked ~ .uncheckedLabel {
    display: none;
  }

  .uncheckedLabel {
    display: none;
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

const FollowComponent = () => {
  return (
      <MyPageTemplate>
<FollowForm>
  <div data-th-fragment="followList" className="memberListBox">
    <h3 data-th-text="'🌱 팔로워 리스트'">팔로워 리스트</h3>
    <h3 data-th-text="'🌱 팔로잉 리스트'">팔로잉 리스트</h3>
    <h3 data-th-text="'🌱 친구찾기'">친구찾기</h3>
    <div className="memberItem">
      <StyledInput
          data-th-id="memberNo"
          data-th-value=""
          type="hidden"
      />
      {/*<img className="memberPhoto" data-th-src="'/images/default.jpg'"*/}
      {/*     data-th-unless="${member.photo}"></img>*/}
      {/*  <img className="memberPhoto" data-th-if="${member.photo}"*/}
      {/*       data-th-src="|https://kr.object.ncloudstorage.com/bitcamp-nc7-bucket-14/sns_member/${member.photo}|"></img>*/}

      <StyledInput
          className="toggleBox"
          data-th-checked=""
          data-th-id=""
          type="checkbox"
          style={{ display: 'none' }} // 스타일을 객체로 변경
      />
      <label
          className="checkedLabel"
          data-th-for=""
          data-th-onclick=""
          style={{ marginTop: '25px', color: '#426B1F', backgroundColor: 'transparent' }}
      >
        팔로잉 취소
      </label>
      <label
          className="uncheckedLabel"
          data-th-for=""
          data-th-onclick=""
          style={{ marginTop: '25px', color: '#426B1F', backgroundColor: 'transparent' }}
      >
        팔로우 하기
      </label>
    </div>
  </div>
  {/*<div id="pageLabel">*/}
  {/*  <a th:if="${page > 1}"*/}
  {/*     th:class="${page == 1 ? 'pagination-link pagination-link-active' : 'pagination-link'}"*/}
  {/*     data-th-href="@{${#request.getRequestURL()}(show=${show},page=1,keyword=${param.keyword})}"*/}
  {/*     data-th-text="'1'"></a>*/}

  {/*  <a th:if="${page > 2}"*/}
  {/*     th:class="${page == 2 ? 'pagination-link pagination-link-active' : 'pagination-link'}"*/}
  {/*     data-th-href="@{${#request.getRequestURL()}(show=${show},page=(${page} - 1),keyword=${param.keyword})}"*/}
  {/*     data-th-text="'2'"></a>*/}

  {/*  <a th:class="${page == page ? 'pagination-link pagination-link-active' : 'pagination-link'}"*/}
  {/*     data-th-href="@{${#request.getRequestURL()}(show=${show},page=${page},keyword=${param.keyword})}"*/}
  {/*     data-th-text="${page}"></a>*/}

  {/*  <a th:if="${page < (maxPage - 1)}"*/}
  {/*     th:class="${page + 1 == page ? 'pagination-link pagination-link-active' : 'pagination-link'}"*/}
  {/*     data-th-href="@{${#request.getRequestURL()}(show=${show},page=(${page} + 1),keyword=${param.keyword})}"*/}
  {/*     data-th-text="${page + 1}"></a>*/}

  {/*  <a th:if="${page < maxPage}"*/}
  {/*     th:class="${maxPage == page ? 'pagination-link pagination-link-active' : 'pagination-link'}"*/}
  {/*     data-th-href="@{${#request.getRequestURL()}(show=${show},page=${maxPage},keyword=${param.keyword})}"*/}
  {/*     data-th-text="${maxPage}"></a>*/}
  {/*</div>*/}
</FollowForm>
      </MyPageTemplate>
);
        };
export default FollowComponent;