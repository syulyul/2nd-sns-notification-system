import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import object, { objectSaga } from './exampleAction';
import auth, { authSaga } from './auth';
import board, { boardSaga } from './board';
import notification, { notificationSaga } from './notification';

const rootReducer = combineReducers({
  loading,
  object,
  auth,
  board,
  notification,
});

export function* rootSaga() {
  yield all([objectSaga(), authSaga(), boardSaga(), notificationSaga()]);
}

export default rootReducer;
