import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Header from '../../components/common/Header';
import { logout } from '../../modules/auth';
import { useEffect } from 'react';
import { getNotReadNotiCount } from '../../modules/notification';

const HeaderContainer = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['sessionId']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, myPage, notReadNotiCount } = useSelector(
    ({ auth, notification, myPage }) => ({
      user: auth.user,
      myPage: myPage.myPage,
      notReadNotiCount: notification.notReadNotiCount,
    })
  );

  const onLogout = (e) => {
    e.preventDefault();
    removeCookie('sessionId');
    dispatch(logout());
    navigate(`/auth/login`);
  };

  useEffect(() => {
    if (notReadNotiCount == null) {
      dispatch(getNotReadNotiCount({ memberNo: user.no }));
    }
  }, [notReadNotiCount]);

  return (
    <Header
      user={user}
      myPage={myPage}
      notReadNotiCount={notReadNotiCount}
      onLogout={onLogout}
    />
  );
};

export default HeaderContainer;
