import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet-async';
import ExamplePage from './pages/ExamplePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BoardFormPage from './pages/BoardFormPage';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';
import NotificationListPage from './pages/NotificationListPage';
import MemberInfoPage from './pages/MemberInfoPage';
import MemberInfoUpdatePage from './pages/MemberInfoUpdatePage';
import GuestBookPage from "./pages/GuestBookPage";
import MyPagePage from "./pages/MyPagePage";
import FollowPage from "./pages/FollowPage";
import PwFindPage from "./pages/PwFindPage";

import ChatPage from './pages/ChatPage';

function App() {
  return (
    <>
      <Helmet>
        <title>BitSNS</title>
      </Helmet>
      <Routes>
        <Route element={<ExamplePage />} path={'/'} />
        <Route element={<LoginPage />} path={'/auth/login'} />
        <Route element={<RegisterPage />} path={'/auth/register'} />
      </Routes>
    </>
  );
}

export default App;
