import React from 'react';
import styled from 'styled-components';

const NotificationListStyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    flex-direction: column;
    margin-left: 35px;
`;

const ListContainer = styled.div`
    width: 50%;
    max-height: 100%;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    min-height: 600px;
`;

const NotificationTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;

    > form {
        margin: 1rem;
    }
`;

const NotificationItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 20px;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const StyledButton = styled.button`
    background-color: #426B1F;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
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

    &.pagination-link-active {
        background-color: #426B1F;
        color: white;
    }
`;

const PageLabel = styled.div`
    margin-top: 60px;
    text-align: center;
`;

const NotificationListComponent = ({ notifications }) => {
  return (
      <NotificationListStyledContainer>
        <ListContainer>
          <NotificationTitleContainer>
            <h2 className="notification-title">🌱 알림내용</h2>
            <form>
              <input value="1" name="notiState" type="hidden" />
              <StyledButton>모두 읽음</StyledButton>
            </form>
          </NotificationTitleContainer>

          {notifications.map(noti => (
              <NotificationItem key={noti.id}>
                <a href={noti.url} style={{marginLeft: '4%', color: 'black', textDecoration: 'none'}}>
                  {noti.content}
                </a>
                <span>{noti.notiState === 0 ? '안읽음' : '읽음'}</span>
              </NotificationItem>
          ))}
        </ListContainer>

        <PageLabel>
          {[1, 2, 3, 4, 5].map(page => (
              <PaginationLink key={page} href={`#page-${page}`}>
                {page}
              </PaginationLink>
          ))}
        </PageLabel>
      </NotificationListStyledContainer>
  );
};

export default NotificationListComponent;