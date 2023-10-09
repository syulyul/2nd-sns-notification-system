import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as myPageAPI from '../lib/api/myPage';

const [LIST, LIST_SUCCESS, LIST_FAILURE] =
    createRequestActionTypes('myPage/LIST');

export const list = createAction(LIST, (userNo) => (userNo));

const listSaga = createRequestSaga(LIST, myPageAPI.list);

export function* myPageSaga() {
  yield takeLatest(LIST, listSaga);
}

const initialState = {
  myPage: [],
  userNo: 0,
  myPageError: null,
};

const myPage = handleActions(
    {
      [LIST_SUCCESS]: (state, { payload: myPage }) => ({
        ...state,
        myPage,
        myPageError: null,
      }),
      [LIST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        myPageError: error,
      }),
    },
    initialState
);

export default myPage;