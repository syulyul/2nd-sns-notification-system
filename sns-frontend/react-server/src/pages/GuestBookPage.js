import GuestBookContainer from '../containers/guestBook/GuestBookContainer';
import HeaderContainer from '../containers/common/HeaderContainer';

const GuestBookPage = () => {
  return (
    <>
      <HeaderContainer />
      <GuestBookContainer />;
    </>
  );
};

export default GuestBookPage;