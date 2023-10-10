import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as chatsAPI from '../lib/api/chats';
import { useCookies } from 'react-cookie';

const [ENTER_ROOM, ENTER_ROOM_SUCCESS, ENTER_ROOM_FAILURE] =
  createRequestActionTypes('chats/ENTER_ROOM');

const CONCAT_CHATS = "chats/CONCAT_CHATS";


export const enterRoom = createAction(
  ENTER_ROOM,
  ({ roomId }) => ({
    roomId
  })
);

export const concatChats = createAction(CONCAT_CHATS, ({ newChat }) => ({
  newChat,
}));

const enterRoomSaga = createRequestSaga(ENTER_ROOM, chatsAPI.enterRoom);

export function* chatsSaga() {
  yield takeLatest(ENTER_ROOM, enterRoomSaga);
}


const initialState = {
  room: null,
  chats: null,
  error: null,
};

const chats = handleActions(
  {
    [ENTER_ROOM_SUCCESS]: (
      state, { payload: room, chats, meta: response }) => ({
        ...state,
        room: room,
        chats: chats,
        error: null,
    }),
    [ENTER_ROOM_FAILURE]: (
      state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CONCAT_CHATS]: (state, { payload: { newChat } }) => ({
      ...state,
      chats: [...state.chats, newChat],
    }),
  },
  initialState
);

export default chats;
