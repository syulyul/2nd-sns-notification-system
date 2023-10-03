import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';

const HeaderContainer = () => {
  const { user } = useSelector(({ auth }) => ({
    user: auth.user,
  }));
  return <Header user={user} />;
};

export default HeaderContainer;
