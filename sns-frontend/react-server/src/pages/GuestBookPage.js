import GuestBookContainer from '../containers/guestBook/GuestBookContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import FooterContainer from '../containers/common/FooterContainer';
const GuestBookPage = () => {
  return (
    <>
      <HeaderContainer />
      <GuestBookContainer />
      <FooterContainer />
    </>
  );
};

export default GuestBookPage;