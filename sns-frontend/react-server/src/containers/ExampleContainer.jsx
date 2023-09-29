import ExampleComponent from "../components/ExampleComponent";

const ExampleContainer = () => {

  // useState, eventListener 등 동적 렌더링에 사용하는 함수들을 이곳에 선언
  const exArrowFunction = () => {
  }

  // 렌더링할 domTree를 return;
  return (
    <ExampleComponent>

    </ExampleComponent>
  );
};

export default ExampleContainer;