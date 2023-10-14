import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as chatsAPI from '../lib/api/chats';
// import { useCookies } from 'react-cookie';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const [ENTER_ROOM, ENTER_ROOM_SUCCESS, ENTER_ROOM_FAILURE] =
  createRequestActionTypes('chats/ENTER_ROOM');

const CONCAT_CHATS = 'chats/CONCAT_CHATS';
const [SEND_CHAT, SEND_CHAT_SUCCESS, SEND_CHAT_FAILURE] =
  createRequestActionTypes('chats/SEND_CHAT');

const TRANSLATE_CHATS = 'chats/TRANSLATE_CHATS';

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const enterRoom = createAction(ENTER_ROOM, ({ mno1, mno2 }) => ({
  mno1,
  mno2,
}));

export const sendChat = createAction(SEND_CHAT, ({ roomId, chatTxt }) => ({
  roomId,
  chatTxt,
}));

export const concatChats = createAction(CONCAT_CHATS, ({ newChat }) => ({
  newChat,
}));

export const translateChats = createAction(TRANSLATE_CHATS, ({ translatedChat }) => ({
  translatedChat,
}));

const enterRoomSaga = createRequestSaga(ENTER_ROOM, chatsAPI.enterRoom);
const sendChatSaga = createRequestSaga(SEND_CHAT, chatsAPI.sendChat);

export function* chatsSaga() {
  yield takeLatest(ENTER_ROOM, enterRoomSaga);
  yield takeLatest(SEND_CHAT, sendChatSaga);
}

const initialState = {
  room: null,
  chats: null,
  chatTxt: '',
  error: null,
};

const chats = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [ENTER_ROOM_SUCCESS]: (
      state,
      { payload: { room, chats }, meta: response }
    ) => ({
      ...state,
      room: room,
      chats: chats,
      error: null,
    }),
    [ENTER_ROOM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CONCAT_CHATS]: (state, { payload: { newChat } }) => ({
      ...state,
      chats: [...state.chats, newChat],
    }),
    [SEND_CHAT_SUCCESS]: (state, { payload: { newChat } }) => ({
      ...state,
      chatTxt: '',
      error: null,
    }),
    [SEND_CHAT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [TRANSLATE_CHATS]: (state, { payload: { translatedChat } }) => ({
      ...state,
      chats: [...state.chats, translatedChat],
    }),
  },
  initialState
);

export default chats;
