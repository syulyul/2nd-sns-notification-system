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
const DECREASE = 'notification/DECREASE';

export const notiList = createAction(LIST, ({ memberNo, limit, page }) => ({
  memberNo,
  limit,
  page,
}));
export const notReadNotiCount = createAction(
  NOT_READ_COUNT,
  ({ memberNo }) => ({ memberNo })
);
export const decreaseNotiCount = createAction(DECREASE);

const listSaga = createRequestSaga(LIST, notiAPI.listNotiLog);
const notReadNotiCountSaga = createRequestSaga(
  NOT_READ_COUNT,
  notiAPI.notReadNotiCount
);
export function* notificationSaga() {
  yield takeLatest(LIST, listSaga);
  yield takeLatest(NOT_READ_COUNT, notReadNotiCountSaga);
}

const initialState = {
  notis: [],
  notReadNotiCount: 0,
  error: null,
};

const notification = handleActions(
  {
    [LIST_SUCCESS]: (state, { payload: notis }) => ({
      ...state,
      notis,
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
    [DECREASE]: (state) => ({
      notReadNotiCount: state.notReadNotiCount - 1,
    }),
  },
  initialState
);

export default notification;
