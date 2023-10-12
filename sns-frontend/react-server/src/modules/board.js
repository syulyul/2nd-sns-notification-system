import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as boardAPI from '../lib/api/board';

const CHANGE_FIELD = 'board/CHANGE_FIELD';
const INITIALIZE_FORM = 'board/INITIALIZE_FORM';



// --------------- Action Type ------------------- //

//게시글
const [LIST, LIST_SUCCESS, LIST_FAILURE] =
  createRequestActionTypes('board/LIST');

const [DETAIL, DETAIL_SUCCESS, DETAIL_FAILURE] =
  createRequestActionTypes('board/DETAIL');

const [FORM, FORM_SUCCESS, FORM_FAILURE] =
  createRequestActionTypes('board/FORM');

const [DELETE, DELETE_SUCCESS, DELETE_FAILURE] = createRequestActionTypes('board/DELETE');


//댓글
const [ADD_COMMENT, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE] =
    createRequestActionTypes('comment/ADD_COMMENT');
const [DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE] =
    createRequestActionTypes('comment/DELETE_COMMENT');

//좋아요
const [LIKE_BOARD, LIKE_BOARD_SUCCESS, LIKE_BOARD_FAILURE] = createRequestActionTypes('board/LIKE_BOARD');
const [UNLIKE_BOARD, UNLIKE_BOARD_SUCCESS, UNLIKE_BOARD_FAILURE] = createRequestActionTypes('board/UNLIKE_BOARD');


// --------------- createAction ------------------- //

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const initializeForm = createAction(INITIALIZE_FORM, () => {});

//게시글
export const list = createAction(LIST, (category) => category);

export const detail = createAction(DETAIL, ({ category, boardNo }) => ({
  category,
  boardNo,
}));

export const form = createAction(FORM, ({ formData }) => ({ formData }));
export const deleteBoard = createAction(DELETE, ({boardNo, category}) => ({
  boardNo, category
}));

//댓글
export const addComment = createAction(ADD_COMMENT, ({ content, boardNo }) => ({ content, boardNo }));
export const deleteComment = createAction(DELETE_COMMENT, ({ commentNo, boardNo }) => ({ commentNo, boardNo }));

//좋아요
export const likeBoard = createAction(LIKE_BOARD, (boardNo) => boardNo);
export const unlikeBoard = createAction(UNLIKE_BOARD, (boardNo) => boardNo);

// --------------- Saga ------------------- //

//게시글
const listSaga = createRequestSaga(LIST, boardAPI.list);
const detailSaga = createRequestSaga(DETAIL, boardAPI.detail);
const formSaga = createRequestSaga(FORM, boardAPI.form);
const deleteBoardSaga  = createRequestSaga(DELETE, boardAPI.deleteBoard);

//댓글
const addCommentSaga = createRequestSaga(ADD_COMMENT, boardAPI.addComment);
const deleteCommentSaga = createRequestSaga(DELETE_COMMENT, boardAPI.deleteComment);

//좋아요
const likeBoardSaga = createRequestSaga(LIKE_BOARD, boardAPI.likeBoard);
const unlikeBoardSaga = createRequestSaga(UNLIKE_BOARD, boardAPI.unlikeBoard);


export function* boardSaga() {
  //게시글
  yield takeLatest(LIST, listSaga);
  yield takeLatest(DETAIL, detailSaga);
  yield takeLatest(FORM, formSaga);
  yield takeLatest(DELETE, deleteBoardSaga);

  //댓글
  yield takeLatest(ADD_COMMENT, addCommentSaga);
  yield takeLatest(DELETE_COMMENT, deleteCommentSaga);

  //좋아요
  yield takeLatest(LIKE_BOARD, likeBoardSaga);
  yield takeLatest(UNLIKE_BOARD, unlikeBoardSaga);
}

const initialState = {
  boardList: [],
  category: 1,
  board: {},
  comments: null,
  boardError: null, // 에러 상태
  boardComment: null,
  commentError: null,
};

// --------------- Reducer ------------------- //
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

    //게시글
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
    [DELETE_SUCCESS]: (state) => ({
      ...state,
      boardError: null,
      board: initialState.board,
    }),
    [DELETE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      boardError: error,
    }),

    //댓글
    [ADD_COMMENT_SUCCESS]: (state, { payload: boardComment }) => ({
      ...state,
      commentError: null,
      boardComment,
    }),
    [ADD_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      commentError: error,
    }),
    [DELETE_COMMENT_SUCCESS]: (state, { payload: { commentNo, boardNo } }) => ({
      ...state,
      commentError: null,
    }),
    [DELETE_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      commentError: error,
    }),

    //좋아요
    [LIKE_BOARD_SUCCESS]: (state, { payload: board }) => ({
      ...state,
      boardError: null,
      board,
    }),
    [LIKE_BOARD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      boardError: error,
    }),
    [UNLIKE_BOARD_SUCCESS]: (state, { payload: board }) => ({
      ...state,
      boardError: null,
      board,
    }),
    [UNLIKE_BOARD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      boardError: error,
    }),
  },
  initialState
);

export default board;
