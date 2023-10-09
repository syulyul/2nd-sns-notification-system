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

const [FOLLOW, FOLLOW_SUCCESS, FOLLOW_FAILURE] =
    createRequestActionTypes('myPage/FOLLOW');

const [UNFOLLOW, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE] =
    createRequestActionTypes('myPage/UNFOLLOW');

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

export const list = createAction(LIST, (userNo) => (userNo));
export const info = createAction(INFO, (userNo) => (userNo));
export const follow = createAction(FOLLOW, (followingNo) => ({ followingNo }));
export const unfollow = createAction(UNFOLLOW, (followingNo) => ({ followingNo }));

const updateSaga = createRequestSaga(UPDATE, myPageAPI.update);
const listSaga = createRequestSaga(LIST, myPageAPI.list);
const infoSaga = createRequestSaga(INFO, myPageAPI.info);
const followSaga = createRequestSaga(FOLLOW, myPageAPI.follow);
const unfollowSaga = createRequestSaga(UNFOLLOW, myPageAPI.unfollow);

export function* myPageSaga() {
  yield takeLatest(UPDATE, updateSaga);
  yield takeLatest(LIST, listSaga);
  yield takeLatest(INFO, infoSaga);
  yield takeLatest(FOLLOW, followSaga);
  yield takeLatest(UNFOLLOW, unfollowSaga);
}

const initialState = {
  myPage: [],
  userNo: 0,
  myPageError: null,
  followList: [], // 팔로워 목록을 저장할 배열
};

const myPage = handleActions(
    {
      [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
        ...state,
        [key]: value,
      }),
      [INITIALIZE_FORM]: (state) => ({
        ...state,

        myPage: [],
        userNo: 0,
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
      [FOLLOW_SUCCESS]: (state, { payload: followList }) => ({
        ...state,
        followList, // 팔로워 목록 업데이트
      }),
      [FOLLOW_FAILURE]: (state, { payload: error }) => ({
        ...state,
        myPageError: error,
      }),

      [UNFOLLOW_SUCCESS]: (state, { payload: followList }) => ({
        ...state,
        followList, // 팔로워 목록 업데이트
      }),
      [UNFOLLOW_FAILURE]: (state, { payload: error }) => ({
        ...state,
        myPageError: error,
      }),
    },
    initialState
);


export default myPage;