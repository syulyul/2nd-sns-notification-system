import { useDispatch, useSelector } from 'react-redux';
import ExampleComponent from '../components/ExampleComponent';
import { exampleAction, increase, reloadView } from '../modules/exampleAction';

const ExampleContainer = () => {
  const dispatch = useDispatch();
  const { object, loading } = useSelector(({ object, loading }) => ({
    state1: object.state1,
    state2: object.state2,
    state3: object.state3,
    loading: loading['object/EXAMPLE_ACTION'],
  }));

  const args1 = 'args1';
  const args2 = 'args2';

  const onExample = () => {
    dispatch(exampleAction({ args1, args2 }));
  };

  const onIncrease = () => {
    dispatch(increase());
  };

  // 렌더링할 domTree를 return;
  return (
    <ExampleComponent
      onExample={onExample}
      onIncrease={onIncrease}
    ></ExampleComponent>
  );
};

export default ExampleContainer;
