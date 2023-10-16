import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as guestBookAPI from '../lib/api/guestBook';

const CHANGE_FIELD = 'guestBook/CHANGE_FIELD';
const INITIALIZE_FORM = 'guestBook/INITIALIZE_FORM';

const [POST, POST_SUCCESS, POST_FAILURE] =
    createRequestActionTypes('guestBook/POST');
const [LIST, LIST_SUCCESS, LIST_FAILURE] =
    createRequestActionTypes('guestBook/LIST');
const [DELETE, DELETE_SUCCESS, DELETE_FAILURE] =
  createRequestActionTypes('guestBook/DELETE');

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const initializeForm = createAction(INITIALIZE_FORM, () => {});

export const post = createAction(POST,
    ({ mpno, title, content, writer, }) => ({ mpno, title, content, writer, }));
export const list = createAction(LIST, ({ no, limit, page }) => ({
  no,
  limit,
  page,
}));
export const deleteGuestBook = createAction(DELETE, (guestBookNo) => guestBookNo);

const postSaga = createRequestSaga(POST, guestBookAPI.post);
const listSaga = createRequestSaga(LIST, guestBookAPI.list);
const deleteSaga = createRequestSaga(DELETE, guestBookAPI.deleteGuestBook);

export function* guestBookSaga() {
  yield takeLatest(POST, postSaga);
  yield takeLatest(LIST, listSaga);
  yield takeLatest(DELETE, deleteSaga);
}

const initialState = {
  guestBookList: [],
  no: 0,
  lastPage: 1,
  guestBookOwnerNick: '',
  title: '',
  content: '',

  guestBookError: null,
  guestBook: null,
  user: null,
};

const guestBook = handleActions(
    {
      [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
        ...state,
        [key]: value,
      }),

      [INITIALIZE_FORM]: (state) => ({
        ...state,

        title: '',
        content: '',
        no: 0,
      }),

      [POST_SUCCESS]: (state, { payload: guestBook }) => ({
        ...state,
        guestBookError: null,
        guestBook,
      }),
      [POST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        guestBookError: error,
      }),
      [LIST_SUCCESS]: (state, { payload: resultMap }) => ({
        ...state,
        guestBookList: resultMap.guestBookList,
        guestBookOwnerNick: resultMap.guestBookOwnerNick,
        lastPage: resultMap.lastPage, // 추가된 부분
        guestBookError: null,
      }),
      [LIST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        guestBookError: error,
      }),

      [DELETE_SUCCESS]: (state) => ({
        ...state,
        guestBook: initialState.guestBook,
        guestBookError: null,
      }),
      [DELETE_FAILURE]: (state, { payload: error }) => ({
        ...state,
        guestBookError: error,
      }),
    },
    initialState
);

export default guestBook;