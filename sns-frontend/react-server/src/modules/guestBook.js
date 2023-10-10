import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as guestBookAPI from '../lib/api/guestBook';

const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [LIST, LIST_SUCCESS, LIST_FAILURE] =
    createRequestActionTypes('guestBook/LIST');

export const initializeForm = createAction(INITIALIZE_FORM, () => {});

export const list = createAction(LIST, (userNo) => (userNo));

const listSaga = createRequestSaga(LIST, guestBookAPI.list);

export function* guestBookSaga() {
  yield takeLatest(LIST, listSaga);
}

const initialState = {
  guestBookList: [],
  userNo: 0,
  guestBookOwnerNick: '',
  guestBookError: null,
  user: null,
};

const guestBook = handleActions(
    {

      [INITIALIZE_FORM]: (state) => ({
        ...state,

        guestBookList: [],
        guestBookOwnerNick: '',
        resultMap: null,
        userNo: 0,
      }),

      [LIST_SUCCESS]: (state, { payload: resultMap}) => ({
        ...state,
        guestBookList: resultMap.guestBookList,
        guestBookOwnerNick: resultMap.guestBookOwnerNick,
        guestBookError: null,
      }),
      [LIST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        guestBookError: error,
      }),
    },
    initialState
);

export default guestBook;