import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as exAjaxAPI from '../lib/api/exampleApi';
import { takeLatest } from 'redux-saga/effects';

// 백엔드 서버와 통신하는 경우
const [EXAMPLE_ACTION, EXAMPLE_ACTION_SUCCESS, EXAMPLE_ACTION_FIALURE] =
  createRequestActionTypes('object/EXAMPLE_ACTION');
// 백엔드 서버와 통신하지 않는 경우
const RELOAD_VIEW = 'object/RELOAD_VIEW';

export const exampleAction = createAction(EXAMPLE_ACTION, ({ arg1, arg2 }) => ({
  arg1,
  arg2,
}));
export const reloadView = createAction(RELOAD_VIEW);

const exampleActionSaga1 = createRequestSaga(
  EXAMPLE_ACTION,
  exAjaxAPI.exAjaxGet
);
const exampleActionSaga2 = createRequestSaga(
  EXAMPLE_ACTION,
  exAjaxAPI.exAjaxPost
);
export function* objectSaga() {
  yield takeLatest(EXAMPLE_ACTION, exampleActionSaga1);
  yield takeLatest(EXAMPLE_ACTION, exampleActionSaga2);
}

const initialState = {
  state1: null,
  state2: null,
  error: null,
};

const object = handleActions(
  {
    [EXAMPLE_ACTION_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      state1: data.arg1,
      state2: data.arg2,
      error: null,
    }),
    [EXAMPLE_ACTION_FIALURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [RELOAD_VIEW]: () => initialState,
  },
  initialState
);

export default object;
