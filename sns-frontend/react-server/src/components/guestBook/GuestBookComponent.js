import styled from 'styled-components';
import React, { useState } from 'react';
import guestBook from '../../modules/guestBook';
import Pagination from '../common/Pagination';

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
  width: 40%;
  margin: 0 auto;
  border: none;
  border-collapse: collapse;

  td {
    border: none;
  }
`;

const ContentContainer = styled.div`
  text-align: center;
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
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const NoCell = styled.td`
  text-align: center;
`;

const TitleMetaCell = styled.td`
  // 다른 TitleMetaCell 스타일 속성 추가
`;

const FirstRow = styled.tr`
  background-color: #f2f2f2;
`;

const SecondRow = styled.tr`
  background-color: white;
  height: 200px;
`;

const WriterCell = styled.td`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const NickNameDiv = styled.div`
  margin-top: 5px;
`;

const ContentLikeCell = styled.td`
  position: relative;
`;

const LikeButtonContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  width: 0;
`;

const LikeLabel = styled.label`
  background-color: transparent;
`;

const Table = styled.table`
  // 필요한 스타일을 추가합니다.
`;

const ButtonContainer = styled.div`
`;

const DeleteButton = styled.button`
  text-align: center;
  margin-left: 37%;
  margin-bottom: 2%;
  padding: 5px 10px;
  background-color: #426B1F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const DeleteButtonContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const LikeButton = styled(StyledButton)`
  margin-top: 30px;
  margin-left: 500px;
  right: 0;
  bottom: 0;
  background-color: transparent;
  color: black;
`;

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const GuestBookComponent = ({
  content,
  title,
  onChange,
  onDelete,
  mpno,
  onSubmit,
  guestBookList,
  guestBookOwnerNick,
  guestBook,
  guestBookNo,
  handleUnlike,
  handleLike,
  likeGuestBookSet,
  totalPages,
  currentPage,
  onPageChange,
  lastPage,
  page,
  query,
}) => {
  return (
    <>
      <GuestbookTitle>
        <h2>🌱 {guestBookOwnerNick ? `${guestBookOwnerNick} 의 방명록 🌱` : ''}</h2>
      </GuestbookTitle>

      <AddGuestbookForm>
        <StyledForm method='post' action='/guestBook/add'>
          <StyledTable>
            <tbody>
              <tr>
                <StyledTh>🌱 제목</StyledTh>
                <td>
                  <StyledInput
                    type='text'
                    name='title'
                    placeholder='제목을 입력하세요'
                    required
                    value={title}
                    onChange={onChange}
                  />
                </td>
              </tr>
              <tr>
                <StyledTh>🌱 내용</StyledTh>
                <td>
                  <StyledTextarea
                    name='content'
                    rows='6'
                    cols='150'
                    placeholder='내용을 입력하세요'
                    required
                    value={content}
                    onChange={onChange}
                  ></StyledTextarea>
                </td>
              </tr>
            </tbody>
            <input type='hidden' name='mpno' value={mpno} />
          </StyledTable>
          <StyledDiv>
            <StyledButton type='submit' onClick={onSubmit}>작성</StyledButton>
          </StyledDiv>
        </StyledForm>
      </AddGuestbookForm>


      {Array.isArray(guestBookList) && guestBookList.map((guestBook, index) => (
        <Container key={guestBook.no}>
          <ContentContainer>
            <ContentTable>
              <tbody>
                <FirstRow>
                  <NoCell>
                    <span>No. {guestBook.no}</span>
                  </NoCell>
                  <TitleMetaCell colSpan='3'>
                    <HorizontalLayout>
                      <span>{guestBook.title}</span>
                      <MetaInfo>
                        <ClockIcon src='/images/clock.png' />
                        <span>{formatDate(guestBook.createdAt)}</span>
                      </MetaInfo>
                    </HorizontalLayout>
                  </TitleMetaCell>
                </FirstRow>
                <SecondRow>
                  <WriterCell>
                    <ProfilePicture>
                      <img src={guestBook.writer.photo || '/images/avatar.png'}
                           alt='profile' />
                    </ProfilePicture>
                    <NickNameDiv>{guestBook.writer.nick
                      || '임시 닉네임'}</NickNameDiv>
                  </WriterCell>
                  <ContentLikeCell colSpan='3'>
                    <GuestBookTextarea readOnly>
                      {guestBook.content || '내용'}
                    </GuestBookTextarea>
                    {likeGuestBookSet && likeGuestBookSet.includes(guestBook.no) ? (
                        <LikeButton onClick={() => handleUnlike(guestBook.no)}>
                          ❤️
                        </LikeButton>
                    ) : (
                        <LikeButton onClick={() => handleLike(guestBook.no)}>
                          🤍
                        </LikeButton>
                    )}
                  </ContentLikeCell>
                </SecondRow>
              </tbody>
            </ContentTable>
          </ContentContainer>
          <DeleteButtonContainer>
            <StyledButton onClick={(e) => onDelete(e, guestBook.no)} >삭제</StyledButton>
          </DeleteButtonContainer>
        </Container>
      ))}
      <Pagination page={page} query={query} lastPage={lastPage} />
    </>
  );
};

export default GuestBookComponent;