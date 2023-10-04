import styled from 'styled-components';
import Button from "../common/Button";

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 20px;
  border-radius: 3px;
  outline: none;
  padding: 0px 0px 5px 5px;
  height: 60px;
  width: 420px;

  ::placeholder {
    color: #3a3a3a;
  }
`;

const GuestBookContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const GuestBookItem = styled.div`
  border: 1px solid #ddd;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;

  .meta-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .first-row {
    background-color: #f2f2f2;
  }

  .second-row {
    background-color: white;
    height: 200px;
  }

  .clock-icon {
    width: 16px;
    height: 16px;
  }

  .horizontal-layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .writer-cell {
    width: 15%;
  }

  .content-like-cell {
    width: 35%;
    position: relative;
    display: flex;
    flex-direction: column; /* 수정: 내부 요소를 세로로 정렬하기 위해 flex-direction 추가 */
  }

  .guestBook_textarea {
    flex: 1;
    min-height: 7em;
    border-color: transparent;
    resize: none;
  }

  .like-buttons {
    padding: 5px 10px;
    background-color: transparent;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`;

const SubmitButton = styled(Button)`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  color: white;
  background-color: #426b1f;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 600px;
`;

const GuestBookComponent = ({
  title,
  content,
  onChange,
  onSubmit,
  guestBookList
}) => {
  return (
      <GuestBookContainer>
        <div data-th-replace="header :: header"></div>
        <h2 style={{textAlign: 'center'}}>🌱래시포드의 방명록🌱</h2>
        <tr>
          <th style={{textAlign: 'left', width: '200px'}}>🌱 제목</th>
          <td>
            <StyledInput
                type="text"
                name="title"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={onChange}
            />
          </td>
        </tr>
        <tr>
          <th style={{textAlign: 'left', width: '200px'}}>🌱 내용</th>
          <td>
            <StyledInput
                type="textarea"
                name="content"
                placeholder="내용을 입력하세요"
                value={content}
                onChange={onChange}
            />
          </td>
        </tr>
        <SubmitButton type="submit" onClick={onSubmit}>
          작성
        </SubmitButton>
        {guestBookList.map((guestBook) => (
            <GuestBookItem key={guestBook.no}>
              {/* 게시글 내용을 출력하는 부분 */}
              <div className="first-row">
                <span>{`No. ${guestBook.no}`}</span>
                <div className="horizontal-layout">
                  <span style={{
                    flex: 1,
                    textAlign: 'center'
                  }}>{guestBook.title}</span>
                  <div className="meta-info">
                    <img className="clock-icon" src="/images/clock.png"
                         alt="Clock Icon"/>
                    <span>{guestBook.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="second-row">
                <div className="writer-cell" style={{textAlign: 'center'}}>
                  <div className="profile-picture">
                    <img
                        src={
                          guestBook.writer.photo
                              ? `/images/sns_member/${guestBook.writer.photo}`
                              : '/images/avatar.png'
                        }
                        alt="프로필 사진"
                    />
                    <a
                        href={`/myPage/${guestBook.writer.no}`}
                        style={{textDecoration: 'none', color: 'black'}}
                    >
                      {guestBook.writer.nick}
                    </a>
                  </div>
                </div>
                <div className="content-like-cell">
                  <div className="guestBook_textarea-wrapper">
                <textarea
                    className="guestBook_textarea"
                    readOnly
                    value={guestBook.content || '내용입니다!'}
                />
                    <div className="like-buttons">
                      <input type="hidden" value={guestBook.no}/>
                      <input className="toggleBox" type="checkbox"/>
                      <label
                          className="checkedLabel"
                          onClick={() => console.log('Unlike clicked')}
                      >
                        ❤️
                      </label>
                      <label
                          className="uncheckedLabel"
                          onClick={() => console.log('Like clicked')}
                      >
                        🤍
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </GuestBookItem>
        ))}
        <SubmitButton type="submit" onClick={onSubmit}>
          삭제
        </SubmitButton>
      </GuestBookContainer>
  );
};

export default GuestBookComponent;