import styled from 'styled-components';
import React from 'react';

const GuestbookTitle = styled.div`
    text-align: center;
`;

const AddGuestbookForm = styled.div`
    text-align: center;
`;

const StyledForm = styled.form`
    display: inline-block;
    text-align: left;
`;

const StyledTable = styled.table`
  width: 40%;
  border-collapse: collapse;
  margin: 0 auto;
  margin-bottom: 20px;
  &,
  th,
  td {
    border: 1px solid #f2f2f2;
  }
  th, td {
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;


const StyledTh = styled.th`
    text-align: left;
    width: 200px;
`;

const StyledInput = styled.input`
    font-size: 18px;
    border: none;
    width: 100%;
`;

const StyledTextarea = styled.textarea`
    font-size: 18px;
    border: none;
    width: 100%;
    overflow: hidden;
    resize: none;
`;

const StyledButton = styled.button`
    padding: 5px 10px;
    background-color: #426B1F;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    float: inherit;

     &.actions {
     margin: 5px;
  }
`;

const StyledDiv = styled.div`
    text-align: center;
    margin-left: 37%;
    margin-bottom: 2%;
`;

const ScrollableTable = styled.div`
    max-height: 300px;
    overflow-y: scroll;
`;

const Actions = styled.div`
    text-align: center;
    padding: 16px;
    line-height: 15;
`;


const ContentTable = styled.table`
    border: none;
    border-collapse: collapse;

    td {
        border: none;
    }
`;

const MetaInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ClockIcon = styled.img`
    width: 16px;
    height: 16px;
`;

const HorizontalLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

const ProfilePicture = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
        height: auto;
    }
`;

const PaginationLink = styled.a`
    display: inline-block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-right: 4px;
    border-radius: 50%;
    background-color: #f2f2f2;
    text-decoration: none;
    color: black;

    &.active {
        background-color: #426B1F;
        color: white;
    }
`;

const PageLabel = styled.div`
    margin-top: 60px;
    text-align: center;
`;

const GuestBookTextarea = styled.textarea`
    width: 100%;
    min-height: 7em;
    border-color: transparent;
    resize: none;
`;



const Container = styled.div`
    // 다른 container 스타일 속성 추가
`;


const NoCell = styled.td`
    text-align: center;
`;

const TitleMetaCell = styled.td`
    // 다른 TitleMetaCell 스타일 속성 추가
`;



const WriterCell = styled.td`
    text-align: center;
`;


const ContentLikeCell = styled.td`
    position: relative;
`;



const GuestBookComponent = ({
  title,
  content,
  onChange,
  onSubmit,
  guestBookList,
  guestBookOwnerNick
}) => {
  return (
      <div>
        <GuestbookTitle>
          <h2>🌱 {guestBookOwnerNick ? `${guestBookOwnerNick} 의 방명록 🌱` : ''}</h2>
        </GuestbookTitle>

        <AddGuestbookForm>
          <StyledForm method="post" action="/guestBook/add">
            <StyledTable>
              <tbody>
                <tr>
                  <StyledTh>🌱 제목</StyledTh>
                  <td>
                    <StyledInput
                        type="text"
                        name="title"
                        id="title"
                        placeholder="제목을 입력하세요"
                        required
                    />
                  </td>
                </tr>
                <tr>
                  <StyledTh>🌱 내용</StyledTh>
                  <td>
                    <StyledTextarea
                        name="content"
                        id="content"
                        rows="6"
                        cols="150"
                        placeholder="내용을 입력하세요"
                        required
                    ></StyledTextarea>
                  </td>
                </tr>
              </tbody>
            </StyledTable>
            <StyledDiv>
              <StyledButton type="submit">작성</StyledButton>
            </StyledDiv>
          </StyledForm>
        </AddGuestbookForm>

        <Container>
          <ContentTable>
            <tbody>
              <tr>
                <NoCell>
                  <span>No. 예시번호</span>
                </NoCell>
                <TitleMetaCell colSpan="3">
                  <HorizontalLayout>
                    <span>예시 제목</span>
                    <MetaInfo>
                      <ClockIcon src="/images/clock.png" />
                      <span>2023-10-05</span>
                    </MetaInfo>
                  </HorizontalLayout>
                </TitleMetaCell>
              </tr>
              <tr>
                <WriterCell>
                  <ProfilePicture>
                    <img src="/images/avatar.png" alt="프로필 사진" />
                  </ProfilePicture>
                  <div style={{ marginTop: "5px" }}>
                    예시 사용자
                  </div>
                </WriterCell>
                <ContentLikeCell colSpan="3">
                  <GuestBookTextarea readOnly>
                    예시 내용
                  </GuestBookTextarea>
                </ContentLikeCell>
              </tr>
            </tbody>
          </ContentTable>
        </Container>
      </div>
  );
};

export default GuestBookComponent;