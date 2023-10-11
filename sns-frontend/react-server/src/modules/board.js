import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as boardAPI from '../lib/api/board';
import { useCookies } from 'react-cookie';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [LIST, LIST_SUCCESS, LIST_FAILURE] =
  createRequestActionTypes('board/LIST');

const [DETAIL, DETAIL_SUCCESS, DETAIL_FAILURE] =
  createRequestActionTypes('board/DETAIL');

const [FORM, FORM_SUCCESS, FORM_FAILURE] =
  createRequestActionTypes('board/FORM');

const [ADD_COMMENT, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE] =
    createRequestActionTypes('comment/ADD_COMMENT');

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const initializeForm = createAction(INITIALIZE_FORM, () => {});

export const list = createAction(LIST, (category) => category);

export const detail = createAction(DETAIL, ({ category, boardNo }) => ({
  category,
  boardNo,
}));

export const form = createAction(FORM, ({ formData }) => ({ formData }));

export const addComment = createAction(ADD_COMMENT, ({ content, boardNo }) => ({ content, boardNo }));

const listSaga = createRequestSaga(LIST, boardAPI.list);
const detailSaga = createRequestSaga(DETAIL, boardAPI.detail);
const formSaga = createRequestSaga(FORM, boardAPI.form);
const addCommentSaga = createRequestSaga(ADD_COMMENT, boardAPI.addComment);

export function* boardSaga() {
  yield takeLatest(LIST, listSaga);
  yield takeLatest(DETAIL, detailSaga);
  yield takeLatest(FORM, formSaga);
  yield takeLatest(ADD_COMMENT, addCommentSaga);
}

// const initialState = {
//   boardList: [],  // 게시글 목록
//   category: 1,    // 카테고리 (예시로 1을 기본값으로 설정)
//   board: null,     // 개별 게시글 조회 결과
//   boardError: null    // 에러 상태
// };

const initialState = {
  boardList: [],
  category: 1,
  board: null,
  comments: null,
  boardError: null, // 에러 상태
  boardComment: null,
  commentError: null,
};

const board = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [INITIALIZE_FORM]: (state) => ({
      ...state,
      title: '',
      content: '',
      files: '',
      board: null,
    }),
    [LIST_SUCCESS]: (state, { payload: boardList }) => ({
      ...state,
      boardError: null,
      boardList,
    }),
    [LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      boardError: error,
    }),
    [DETAIL_SUCCESS]: (state, { payload: response }) => ({
      ///
      ...state,
      boardError: null,
      ...response,
    }),
    [DETAIL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      boardError: error,
    }),
    [FORM_SUCCESS]: (state, { payload: board }) => ({
      ...state,
      boardError: null,
      board,
    }),
    [FORM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      boardError: error,
    }),
    [ADD_COMMENT_SUCCESS]: (state, { payload: boardComment }) => ({
      ...state,
      commentError: null,
      boardComment,
    }),
    [ADD_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      commentError: error,
    }),
  },
  initialState
);

export default board;
