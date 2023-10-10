import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterComponent from '../../components/auth/RegisterComponent';
import { changeField, initializeForm, register } from '../../modules/auth';

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nick, name, phoneNumber, password, verificationCode, authError } =
    useSelector(({ auth }) => ({
      nick: auth.nick,
      name: auth.name,
      phoneNumber: auth.phoneNumber,
      password: auth.password,
      photo: auth.photo,
      verificationCode: auth.verificationCode,
      authError: auth.authError,
    }));

  let formData = new FormData();
  formData.append('files', null);
  const onChangeFile = (e) => {
    const { files } = e.target;
    formData = new FormData();
    formData.append('files', files[0]);
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formData.append(
      'data',
      new Blob([JSON.stringify({ nick, name, phoneNumber, password })], {
        type: 'application/json',
      })
    );
    dispatch(register({ formData }));
    dispatch(initializeForm());
  };

  const onAuthPhoneNumber = (e) => {
    dispatch();
  };
  const onCheckPhoneNumber = (e) => {
    dispatch();
  };

  return (
    <RegisterComponent
      nick={nick}
      name={name}
      phoneNumber={phoneNumber}
      password={password}
      verificationCode={verificationCode}
      onChange={onChange}
      onChangeFile={onChangeFile}
      onAuthPhoneNumber={onAuthPhoneNumber}
      onCheckPhoneNumber={onCheckPhoneNumber}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterContainer;
