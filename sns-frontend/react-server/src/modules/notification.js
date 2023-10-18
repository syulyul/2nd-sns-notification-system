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
const [READ_ALL_NOTI, READ_ALL_NOTI_SUCCESS, READ_ALL_NOTI_FAILURE] =
  createRequestActionTypes('notification/READ_ALL_NOTI');

const INITIALIZE_NOTI = 'notification/INITIALIZE_NOTI';

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
export const readAllNoti = createAction(
  READ_ALL_NOTI,
  ({ memberNo, notiState = 1 }) => ({
    memberNo,
    notiState,
  })
);
export const initializeNoti = createAction(INITIALIZE_NOTI, () => {});

const listSaga = createRequestSaga(LIST, notiAPI.listNotiLog);
const notReadNotiCountSaga = createRequestSaga(
  NOT_READ_COUNT,
  notiAPI.notReadNotiCount
);
const readNotiSaga = createRequestSaga(READ_NOTI, notiAPI.updateNotiState);
const readAllNotiSaga = createRequestSaga(
  READ_ALL_NOTI,
  notiAPI.updateAllNotiState
);

export function* notificationSaga() {
  yield takeLatest(LIST, listSaga);
  yield takeLatest(NOT_READ_COUNT, notReadNotiCountSaga);
  yield takeLatest(READ_NOTI, readNotiSaga);
  yield takeLatest(READ_ALL_NOTI, readAllNotiSaga);
}

const initialState = {
  notis: [],
  lastPage: 1,
  notReadNotiCount: null,
  error: null,
};

const notification = handleActions(
  {
    [INITIALIZE_NOTI]: () => ({
      ...initialState,
    }),
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
      notReadNotiCount: state.notReadNotiCount - 1,
    }),
    [READ_NOTI_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [READ_ALL_NOTI_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      notReadNotiCount: 0,
    }),
    [READ_ALL_NOTI_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default notification;
