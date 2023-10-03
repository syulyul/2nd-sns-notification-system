import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Header from '../../components/common/Header';
import { logout } from '../../modules/auth';
import { useEffect } from 'react';

const HeaderContainer = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['sessionId']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(({ auth }) => ({
    user: auth.user,
  }));

  const onLogout = (e) => {
    e.preventDefault();
    removeCookie('sessionId');
    dispatch(logout());
    navigate(`auth/login`);
  };

  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
