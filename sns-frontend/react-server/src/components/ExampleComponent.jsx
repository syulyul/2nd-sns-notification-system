import styled from 'styled-components';

const ExampleComponentBlock = styled.div``;

const ExampleComponent = ({ onExample, onIncrease }) => {
  return (
    <ExampleComponentBlock>
      <div onClick={onExample}>test</div>
      <div onClick={onIncrease}>increase</div>
    </ExampleComponentBlock>
  );
};

export default ExampleComponent;
