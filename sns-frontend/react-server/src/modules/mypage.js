import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as mypageAPI from '../lib/api/mypage';
import { takeLatest } from 'redux-saga/effects';

// 백엔드 서버와 통신하는 경우
const [
  INFO,
  INFO_SUCCESS,
  INFO_FAILURE,
] = createRequestActionTypes('myPage/INFO');

// INCREASE 액션 타입을 myPage 네임스페이스 아래에 추가
const INCREASE = 'myPage/INCREASE';

export const exampleAction = createAction(INFO, ({ arg1, arg2 }) => ({
  arg1,
  arg2,
}));
export const increase = createAction(INCREASE);

const infoSaga = createRequestSaga(INFO, mypageAPI.info);
export function* myPageSaga() {
  yield takeLatest(INFO, infoSaga);
}

const initialState = {
  visitCount: '',
  photo: '',
  nick: '',
  no: '',
};

const mypage = handleActions(
    {
      [INFO_SUCCESS]: (state, { payload: data }) => ({
        ...state,
        visitCount: data.visitCount,
        photo: data.photo,
        nick: data.nick,
        no: data.no,
      }),
      [INFO_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
      }),
      // INCREASE 액션 핸들링 추가
      [INCREASE]: (state) => ({
        ...state,
        state3: state.state3 + 1,
      }),
    },
    initialState
);

export default mypage;