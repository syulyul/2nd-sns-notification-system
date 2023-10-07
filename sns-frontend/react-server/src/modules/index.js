import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import object, { objectSaga } from './exampleAction';
import auth, { authSaga } from './auth';
import myPage, { myPageSaga } from './myPage';

const rootReducer = combineReducers({
  loading,
  object,
  auth,
  myPage
});

export function* rootSaga() {
  yield all([objectSaga(), authSaga(), myPageSaga()]);
}

export default rootReducer;
