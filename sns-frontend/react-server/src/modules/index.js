import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import object, { objectSaga } from './exampleAction';
import auth, { authSaga } from './auth';
import board, { boardSaga } from './board';
import rooms, { chatsSaga } from './rooms';

const rootReducer = combineReducers({
  loading,
  object,
  auth,
  board,
  rooms
});

export function* rootSaga() {
  yield all([objectSaga(), authSaga(), boardSaga(), chatsSaga()]);
}

export default rootReducer;
