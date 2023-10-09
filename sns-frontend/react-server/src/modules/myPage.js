import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as myPageAPI from '../lib/api/myPage';
import { takeLatest } from 'redux-saga/effects';


const CHANGE_FIELD = 'myPage/CHANGE_FIELD';
const INITIALIZE_FORM = 'myPage/INITIALIZE_FORM';

// 백엔드 서버와 통신하는 경우
const [INFO, INFO_SUCCESS, INFO_FAILURE] = createRequestActionTypes('myPage/{no}');

// INCREASE 액션 타입을 myPage 네임스페이스 아래에 추가

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const initializeForm = createAction(INITIALIZE_FORM, () => {});

export const info = createAction(
    INFO,
    ({ visitCount, no, stateMessage }) => ({
      visitCount,
      stateMessage,
      no
    })
);

const infoSaga = createRequestSaga(INFO, myPageAPI.info);
export function* myPageSaga() {
  yield takeLatest(INFO, infoSaga);
}

const initialState = {
  visitCount: '',
  stateMessage:'',
  no: '',
};

const myPage = handleActions(
    {
      [INFO_SUCCESS]: (state, { payload: page }) => ({
        ...state,
        page,
      }),
      [INFO_FAILURE]: (state, { payload: error }) => ({
        ...state,
        error,
      }),
      // INCREASE 액션 핸들링 추가
    },
    initialState
);

export default myPage;