import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import object, { objectSaga } from './exampleAction';
import auth, { authSaga } from './auth';

const rootReducer = combineReducers({
  loading,
  object,
  auth,
});

export function* rootSaga() {
  yield all([objectSaga(), authSaga()]);
}

export default rootReducer;
