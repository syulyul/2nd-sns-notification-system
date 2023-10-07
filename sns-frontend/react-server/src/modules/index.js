import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import object, { objectSaga } from './exampleAction';
import auth, { authSaga } from './auth';
import mypage, { myPageSaga } from './mypage';

const rootReducer = combineReducers({
  loading,
  object,
  auth,
  mypage
});

export function* rootSaga() {
  yield all([objectSaga(), authSaga(), myPageSaga()]);
}

export default rootReducer;
