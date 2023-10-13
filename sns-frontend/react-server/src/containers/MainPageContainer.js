import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ExampleComponent from '../components/ExampleComponent';
import { exampleAction, increase, reloadView } from '../modules/exampleAction';
import { useEffect } from 'react';

const ExampleContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(({ auth, loading }) => ({
    user: auth.user,
    loading: loading['object/EXAMPLE_ACTION'],
  }));

  useEffect(() => {
    navigate(`/auth/login`);
  });

  // 렌더링할 domTree를 return;
  return <ExampleComponent></ExampleComponent>;
};

export default ExampleContainer;
