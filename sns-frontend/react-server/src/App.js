import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet-async';
import ExamplePage from './pages/ExamplePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WriteFormPage from './pages/WriteFormPage';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';
import NotificationListPage from './pages/NotificationListPage';
import MemberInfoPage from './pages/MemberInfoPage';
import MemberInfoUpdatePage from './pages/MemberInfoUpdatePage';



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
        <Route element={<WriteFormPage />} path={'/board/write'} />
        <Route element={<BoardListPage />} path={'/board/list'} />
        <Route element={<BoardDetailPage />} path={'/board/detail'} />
        <Route element={<NotificationListPage />} path={'/notification/list'} />
        <Route element={<MemberInfoPage />} path={'/myPage'} />
        <Route element={<MemberInfoUpdatePage />} path={'/myPage/info'} />

      </Routes>
    </>
  );
}

export default App;
