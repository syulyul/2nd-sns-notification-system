import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as chatsAPI from '../lib/api/chats';
import { useCookies } from 'react-cookie';

const [LIST_ROOMS, LIST_ROOMS_SUCCESS, LIST_ROOMS_FAILURE] =
  createRequestActionTypes('chats/LIST_ROOMS');

const CONCAT_ROOMS = "chats/CONCAT_ROOMS";

const [REMOVE_ROOM, REMOVE_ROOM_SUCCESS, REMOVE_ROOM_FAILURE] =
  createRequestActionTypes('chats/REMOVE_ROOM');


export const roomList = createAction(LIST_ROOMS);

export const concatRooms = createAction(CONCAT_ROOMS, ({ newRoom }) => ({
  newRoom,
}));

export const removeRoom = createAction(REMOVE_ROOM, ({ roomId }) => ({
  roomId,
}));


const roomListSaga = createRequestSaga(LIST_ROOMS, chatsAPI.roomList);

export function* roomsSaga() {
  yield takeLatest(LIST_ROOMS, roomListSaga);
}


const initialState = {
  rooms: [],
  error: null,
};

const rooms = handleActions(
  {
    [LIST_ROOMS_SUCCESS]: (state, { payload: rooms, meta: response }) => ({
      ...state,
      rooms,
      error: null,
    }),
    [LIST_ROOMS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CONCAT_ROOMS]: (state, { payload: { newRoom } }) => ({
      ...state,
      rooms: [...state.rooms, newRoom],
    }),
    [REMOVE_ROOM]: (state, { payload: { roomId }} ) => ({
      ...state,
      rooms: state.rooms.filter((room) => room._id !== roomId),
    }),
  },
  initialState
);

export default rooms;
