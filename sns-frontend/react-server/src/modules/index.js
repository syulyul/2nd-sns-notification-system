import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import object, { objectSaga } from './exampleAction';
import auth, { authSaga } from './auth';
import myPage, { myPageSaga } from './myPage';
import board, { boardSaga } from './board';
import rooms, { roomsSaga } from './rooms';
import chats, { chatsSaga } from './chats';
import notification, { notificationSaga } from './notification';
import guestBook, {guestBookSaga} from "./guestBook";

const rootReducer = combineReducers({
  loading,
  object,
  auth,
  myPage,
  board,
  chats,
  rooms,
  guestBook,
  notification,
});

export function* rootSaga() {
  yield all([
    objectSaga(),
    authSaga(),
    myPageSaga(),
    boardSaga(), 
    chatsSaga(),
    roomsSaga(),
    guestBookSaga(),
    notificationSaga(),
  ]);
}

export default rootReducer;
