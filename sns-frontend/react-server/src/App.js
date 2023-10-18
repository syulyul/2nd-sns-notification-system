import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet-async';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BoardFormPage from './pages/BoardFormPage';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';
import NotificationListPage from './pages/NotificationListPage';
import MemberInfoPage from './pages/MemberInfoPage';
import MemberInfoUpdatePage from './pages/MemberInfoUpdatePage';
import GuestBookPage from './pages/GuestBookPage';
import MyPagePage from './pages/MyPagePage';
import PwFindPage from './pages/PwFindPage';
import ChatPage from './pages/ChatPage';
import ChatRoomListPage from './pages/ChatRoomListPage';

function App() {
  return (
    <>
      <Helmet>
        <title>BitSNS</title>
      </Helmet>
      <Routes>
        <Route element={<MainPage />} path={'/'} />
        <Route element={<LoginPage />} path={'/auth/login'} />
        <Route element={<RegisterPage />} path={'/auth/register'} />
        <Route element={<PwFindPage />} path={'/auth/find'} />
        <Route element={<BoardFormPage />} path={'/board/form/:category'} />
        <Route element={<BoardListPage />} path={'/board/list'} />
        <Route
          element={<BoardDetailPage />}
          path={'/board/detail/:category/:boardNo'}
        />
        <Route element={<NotificationListPage />} path={'/notification/list'} />
        <Route element={<MemberInfoPage />} path={'/myPage/:userNo'} />
        <Route
          element={<MemberInfoUpdatePage />}
          path={'/myPage/:userNo/info'}
        />
        <Route element={<GuestBookPage />} path={'/guestBook/:no'} />
        <Route element={<MyPagePage />} path={'/myPage/detail'} />
        <Route element={<ChatPage />} path={'/room'} />
        <Route element={<ChatRoomListPage />} path={'/room/list'} />
      </Routes>
    </>
  );
}
export default App;
