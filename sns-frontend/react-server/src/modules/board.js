import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as boardAPI from '../lib/api/board';  // 게시판 API 함수들을 위한 경로

// Action Types
const CHANGE_FIELD = 'board/CHANGE_FIELD';
const INITIALIZE_FORM = 'board/INITIALIZE_FORM';

const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] =
    createRequestActionTypes('board/WRITE_POST');
const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] =
    createRequestActionTypes('board/READ_POST');
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] =
    createRequestActionTypes('board/UPDATE_POST');
const [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE] =
    createRequestActionTypes('board/DELETE_POST');

// Action Creators
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const initializeForm = createAction(INITIALIZE_FORM);

export const writePost = createAction(
    WRITE_POST,
    ({ title, content, files, category }) => ({
      title,
      content,
      files,
      category,
    })
);

export const readPost = createAction(READ_POST, (postId) => postId);

export const updatePost = createAction(
    UPDATE_POST,
    ({ id, title, content, files, category }) => ({
      id,
      title,
      content,
      files,
      category,
    })
);

export const deletePost = createAction(DELETE_POST, (postId) => postId);

// Sagas
const writePostSaga = createRequestSaga(WRITE_POST, boardAPI.writePost);
const readPostSaga = createRequestSaga(READ_POST, boardAPI.readPost);
const updatePostSaga = createRequestSaga(UPDATE_POST, boardAPI.updatePost);
const deletePostSaga = createRequestSaga(DELETE_POST, boardAPI.deletePost);

export function* boardSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
  yield takeLatest(DELETE_POST, deletePostSaga);
}

// Initial State
const initialState = {
  title: '',
  content: '',
  files: [],
  category: '',
  post: null,
  postError: null,
};

// Reducer
const board = handleActions(
    {
      [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
        ...state,
        [key]: value,
      }),
      [INITIALIZE_FORM]: (state) => initialState,
      [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
        ...state,
        postError: null,
        post,
      }),
      [WRITE_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        postError: error,
      }),
      [READ_POST_SUCCESS]: (state, { payload: post }) => ({
        ...state,
        post,
      }),
      [READ_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        postError: error,
      }),
      [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
        ...state,
        postError: null,
        post,
      }),
      [UPDATE_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        postError: error,
      }),
      [DELETE_POST_SUCCESS]: (state) => ({
        ...state,
        post: null,
      }),
      [DELETE_POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        postError: error,
      }),
    },
    initialState
);

export default board;
