// modules/myPage.js

// 액션 타입 정의
const SET_MY_PAGE_DATA = 'myPage/SET_MY_PAGE_DATA';

// 액션 생성자 함수 정의
export const setMyPageData = (myPageData) => ({
  type: SET_MY_PAGE_DATA,
  payload: myPageData,
});

// 초기 상태 정의
const initialState = {
  myPageData: {
    visitCount: 0, // 예시: 초기 값으로 0 설정
    stateMessage: '', // 예시: 초기 값으로 빈 문자열 설정
    no: null,       // 예시: 초기 값으로 null 설정
  },
};

// 리듀서 함수 정의
export default function myPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MY_PAGE_DATA:
      return {
        ...state,
        myPageData: action.payload,
      };
      // 다른 액션 타입에 대한 처리도 추가할 수 있습니다.
    default:
      return state;
  }
}