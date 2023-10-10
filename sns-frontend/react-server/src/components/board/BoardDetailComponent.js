import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 70vh;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  position: relative;
`;

const ContentBox = styled.div`
  text-align: left;
  padding: 20px;
  background: #f2f2f2;
  width: 600px;
  height: 1000px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const MetaInfo = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background-color: #426b1f;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const LikeButton = styled(StyledButton)`
  margin-top: 30px;
  margin-left: 500px;
  right: 0;
  bottom: 0;
  background-color: transparent;
  color: black;
`;

const ClockIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const LikeList = styled.div`
  position: absolute;
  top: 730px;
  right: 170px;
`;

const CommentInputContainer = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  border: none;
  padding: 10px;
  resize: none;
  margin-bottom: 20px;
`;

const CommentContainer = styled.div`
  border-top: 1px solid #eee;
  padding: 10px 0;
`;

const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CommentContent = styled.p`
  margin: 0;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const BoardDetailComponent = ({
  board,
  onEdit,
  onReset,
  onDelete,
  onNavigateToList,
  onLike,
  onUnlike,
  comments,
}) => {
  return (
    <Container>
      <ContentBox>
        <form>
          <Title>
            <input
              type="text"
              defaultValue={board ? board.title : ''}
              readOnly={board ? !board.editable : true}
            />
          </Title>
          <MetaInfo>
            <span className="nickname">
              {board && board.writer ? board.writer.nick : 'Unknown'}
            </span>
            <ClockIcon src="/images/clock.png" alt="clock-icon" />
            <span>
              {board && board.createdAt
                ? new Date(board.createdAt).toLocaleDateString()
                : 'Unknown date'}
            </span>
            <ClockIcon src="/images/eye.png" alt="views-icon" />
            <span>{board ? board.viewCount : 0}</span>
          </MetaInfo>
          <textarea
            defaultValue={board ? board.content : ''}
            readOnly={board ? !board.editable : true}
          ></textarea>
          <div>
            {board && board.attachedFiles
              ? board.attachedFiles.map((file, index) => (
                  <div key={index}>
                    <img
                      src={`https://kr.object.ncloudstorage.com/bitcamp-nc7-bucket-14/sns_board/${file.filePath}`}
                      alt="Attached file"
                    />
                    <a href={`https://yourImageServer.com/${file.filePath}`}>
                      Download
                    </a>
                    {board && board.editable ? (
                      <a href="#" onClick={() => onDelete(file.no)}>
                        X
                      </a>
                    ) : null}
                  </div>
                ))
              : null}
          </div>
          <ButtonContainer>
            {board && board.editable ? (
              <>
                <StyledButton onClick={onEdit}>변경</StyledButton>
                <StyledButton onClick={onReset}>초기화</StyledButton>
                <StyledButton onClick={onDelete}>삭제</StyledButton>
              </>
            ) : null}
          </ButtonContainer>
        </form>
        <LikeButton onClick={board && board.liked ? onUnlike : onLike}>
          {board && board.liked ? '좋아요 취소❤️' : '좋아요 누르기 🤍'}
        </LikeButton>
        <StyledButton
          onClick={onNavigateToList}
          style={{ marginTop: '80px', marginLeft: '450px' }}
        >
          목록
        </StyledButton>
      </ContentBox>

      <CommentInputContainer>
        <CommentTextArea placeholder="댓글을 입력하세요."></CommentTextArea>
        <StyledButton>댓글 작성</StyledButton>
      </CommentInputContainer>

      <div>
        {comments && comments.length > 0
          ? comments.map((comment) => (
              <CommentContainer key={comment.id}>
                <CommentMeta>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ProfileImage
                      src={
                        comment && comment.user
                          ? `https://yourImageServer.com/${comment.user.profileImage}`
                          : '/images/default.png'
                      }
                      alt={
                        comment && comment.user ? comment.user.name : 'Unknown'
                      }
                    />
                    <span>
                      {comment && comment.user ? comment.user.name : 'Unknown'}
                    </span>
                  </div>
                  <span>
                    {comment && comment.createdAt
                      ? new Date(comment.createdAt).toLocaleDateString()
                      : 'Unknown date'}
                  </span>
                </CommentMeta>
                <CommentContent>
                  {comment ? comment.content : ''}
                </CommentContent>
              </CommentContainer>
            ))
          : null}
      </div>
    </Container>
  );
};

export default BoardDetailComponent;
