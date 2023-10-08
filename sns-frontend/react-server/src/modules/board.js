import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as boardAPI from '../lib/api/board';
import { useCookies } from 'react-cookie';

// const CHANGE_FIELD = 'board/CHANGE_FIELD';
// const INITIALIZE_FORM = 'board/INITIALIZE_FORM';

const [LIST, LIST_SUCCESS, LIST_FAILURE] =
    createRequestActionTypes('board/LIST');

// export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
//   key,
//   value,
// }));

// export const initializeForm = createAction(INITIALIZE_FORM, () => {});

export const list = createAction(
    LIST,
    (category) => (category)
);

const listSaga = createRequestSaga(LIST, boardAPI.list);

export function* boardSaga() {
  yield takeLatest(LIST, listSaga);
}

const initialState = {
  boardList: [],  // 게시글 목록
  category: 1,    // 카테고리 (예시로 1을 기본값으로 설정)
  error: null,    // 에러 상태
  post: null,     // 개별 게시글 조회 결과
};

const board = handleActions(
    {
      [LIST_SUCCESS]: (state, { payload: boardList }) => ({
        ...state,
        boardError: null,
        boardList,
      }),
      [LIST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        boardError: error,
      }),
    },
    initialState
);

export default board;
