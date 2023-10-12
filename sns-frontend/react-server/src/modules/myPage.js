import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as myPageAPI from '../lib/api/myPage';

const CHANGE_FIELD = 'myPage/CHANGE_FIELD';
const INITIALIZE_FORM = 'myPage/INITIALIZE_FORM';

const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] =
  createRequestActionTypes('myPage/UPDATE');

const [LIST, LIST_SUCCESS, LIST_FAILURE] =
  createRequestActionTypes('myPage/LIST');

const [INFO, INFO_SUCCESS, INFO_FAILURE] =
  createRequestActionTypes('myPage/INFO');

const [FOLLOWING, FOLLOWING_SUCCESS, FOLLOWING_FAILURE] =
  createRequestActionTypes('myPage/FOLLOWING');

const [FOLLOWER, FOLLOWER_SUCCESS, FOLLOWER_FAILURE] =
  createRequestActionTypes('myPage/FOLLOWER');

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const initializeForm = createAction(INITIALIZE_FORM, () => {});

export const update = createAction(
  UPDATE,
  ({ photo, name, nick, birthDay, email, phoneNumber, password, gender }) => ({
    photo,
    name,
    nick,
    birthDay,
    email,
    phoneNumber,
    password,
    gender,
  })
);

export const list = createAction(LIST, (userNo) => userNo);
export const info = createAction(INFO, (userNo) => userNo);
export const following = createAction(FOLLOWING, (userNo) => userNo);
export const follower = createAction(FOLLOWER, (userNo) => userNo);

const updateSaga = createRequestSaga(UPDATE, myPageAPI.update);
const listSaga = createRequestSaga(LIST, myPageAPI.list);
const infoSaga = createRequestSaga(INFO, myPageAPI.info);
const followingSaga = createRequestSaga(FOLLOWING, myPageAPI.following);
const followerSaga = createRequestSaga(FOLLOWER, myPageAPI.follower);

export function* myPageSaga() {
  yield takeLatest(UPDATE, updateSaga);
  yield takeLatest(LIST, listSaga);
  yield takeLatest(INFO, infoSaga);
  yield takeLatest(FOLLOWING, followingSaga);
  yield takeLatest(FOLLOWER, followerSaga);
}

const initialState = {
  myPage: null,
  userNo: 0,
  myPageError: null,
  show: '',
  followList: [], // 팔로워 목록을 저장할 배열
};

const myPage = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      myPage: { ...state.myPage, [key]: value },
    }),
    [INITIALIZE_FORM]: (state) => ({
      ...state,

      myPage: null,
      userNo: 0,
      followList: [], // 팔로워 목록을 저장할 배열
    }),

    [UPDATE_SUCCESS]: (state, { payload: myPage }) => ({
      ...state,
      myPageError: null,
      myPage,
    }),
    [UPDATE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myPageError: error,
    }),

    [LIST_SUCCESS]: (state, { payload: myPage }) => ({
      ...state,
      myPage,
      myPageError: null,
    }),
    [LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myPageError: error,
    }),

    [INFO_SUCCESS]: (state, { payload: myPage }) => ({
      ...state,
      myPage,
      myPageError: null,
    }),
    [INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myPageError: error,
    }),
    // 'followList' 업데이트 액션
    [FOLLOWING_SUCCESS]: (state, { payload: followList }) => ({
      ...state,
      show: 'following',
      followList, // 팔로워 목록 업데이트
    }),
    [FOLLOWING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myPageError: error,
    }),

    [FOLLOWER_SUCCESS]: (state, { payload: followList }) => ({
      ...state,
      show: 'follower',
      followList, // 팔로워 목록 업데이트
    }),
    [FOLLOWER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      myPageError: error,
    }),
  },
  initialState
);

export default myPage;
