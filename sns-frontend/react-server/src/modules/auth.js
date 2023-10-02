import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('auth/CHECK');
const LOGOUT = 'auth/LOGOUT';

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const initializeForm = createAction(INITIALIZE_FORM, () => {});

export const register = createAction(
  REGISTER,
  ({ phoneNumber, password, nick, name, email, photo }) => ({
    phoneNumber,
    password,
    nick,
    name,
    email,
    photo,
  })
);
export const login = createAction(LOGIN, ({ phoneNumber, password }) => ({
  phoneNumber,
  password,
}));
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const checkSaga = createRequestSaga(CHECK, authAPI.check);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(CHECK, checkSaga);
}

const initialState = {
  phoneNumber: '',
  password: '',

  nick: '',
  name: '',
  email: '',
  photo: '',

  user: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [INITIALIZE_FORM]: () => ({
      initialState,
    }),

    [REGISTER_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      authError: null,
      user,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),

    [LOGIN_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      authError: null,
      user,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),

    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      authError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      authError: error,
    }),

    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState
);

export default auth;
