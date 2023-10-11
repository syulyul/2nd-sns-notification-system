import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as notiAPI from '../lib/api/notification';
import { takeLatest } from 'redux-saga/effects';

const [LIST, LIST_SUCCESS, LIST_FAILURE] =
  createRequestActionTypes('notification/LIST');
const [NOT_READ_COUNT, NOT_READ_COUNT_SUCCESS, NOT_READ_COUNT_FAILURE] =
  createRequestActionTypes('notification/NOT_READ_COUNT');
const [READ_NOTI, READ_NOTI_SUCCESS, READ_NOTI_FAILURE] =
  createRequestActionTypes('notification/READ_NOTI');

export const notiList = createAction(LIST, ({ memberNo, limit, page }) => ({
  memberNo,
  limit,
  page,
}));
export const getNotReadNotiCount = createAction(
  NOT_READ_COUNT,
  ({ memberNo }) => ({ memberNo })
);
export const readNoti = createAction(READ_NOTI, ({ _id, notiState = 1 }) => ({
  _id,
  notiState,
}));

const listSaga = createRequestSaga(LIST, notiAPI.listNotiLog);
const notReadNotiCountSaga = createRequestSaga(
  NOT_READ_COUNT,
  notiAPI.notReadNotiCount
);
const readNotiSaga = createRequestSaga(READ_NOTI, notiAPI.updateNotiState);

export function* notificationSaga() {
  yield takeLatest(LIST, listSaga);
  yield takeLatest(NOT_READ_COUNT, notReadNotiCountSaga);
  yield takeLatest(READ_NOTI, readNotiSaga);
}

const initialState = {
  notis: [],
  lastPage: 1,
  notReadNotiCount: null,
  error: null,
};

const notification = handleActions(
  {
    [LIST_SUCCESS]: (state, { payload: { notis, lastPage } }) => ({
      ...state,
      notis,
      lastPage,
      error: null,
    }),
    [LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [NOT_READ_COUNT_SUCCESS]: (state, { payload: notReadNotiCount }) => ({
      ...state,
      notReadNotiCount,
      error: null,
    }),
    [NOT_READ_COUNT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [READ_NOTI_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      notReadNotiCount: state.notReadNotiCoun - 1,
    }),
    [READ_NOTI_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default notification;
