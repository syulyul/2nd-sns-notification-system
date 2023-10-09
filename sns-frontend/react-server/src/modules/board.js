import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as boardAPI from '../lib/api/board';
import { useCookies } from 'react-cookie';


const [LIST, LIST_SUCCESS, LIST_FAILURE] =
    createRequestActionTypes('board/LIST');


const [DETAIL, DETAIL_SUCCESS, DETAIL_FAILURE] =
    createRequestActionTypes('board/DETAIL');

export const list = createAction(
    LIST,
    (category) => (category)
);

export const detail = createAction(
    DETAIL,
    ({category, boardNo}) => ({category, boardNo})
);


const listSaga = createRequestSaga(LIST, boardAPI.list);
const detailSaga = createRequestSaga(DETAIL, boardAPI.detail);

export function* boardSaga() {
  yield takeLatest(LIST, listSaga);
  yield takeLatest(DETAIL, detailSaga);
}

// const initialState = {
//   boardList: [],  // 게시글 목록
//   category: 1,    // 카테고리 (예시로 1을 기본값으로 설정)
//   board: null,     // 개별 게시글 조회 결과
//   boardError: null    // 에러 상태
// };

const initialState = {
  boardList: [],
  category: 1,
  board: {
    title: '제목',
    content: '내용',
    writer: { nick: '닉네임' },
    createdAt: new Date().toISOString(),
    viewCount: 0,
    attachedFiles: [                // 첨부파일 목록
      { filePath: 'path1.jpg' },
      { filePath: 'path2.jpg' }
    ],
    liked: false,
    likes: [],
    editable: false
  },
  comments: [                       // 댓글 목록
    {
      id: 1,
      user: {
        name: 'User1',
        profileImage: 'user1.jpg'
      },
      createdAt: new Date().toISOString(),
      content: 'Sample comment 1'
    },
    {
      id: 2,
      user: {
        name: 'User2',
        profileImage: 'user2.jpg'
      },
      createdAt: new Date().toISOString(),
      content: 'Sample comment 2'
    }
  ],
  boardError: null    // 에러 상태
};

const board = handleActions(
    {
      [LIST_SUCCESS]: (state, { payload: boardList }) => ({
        ...state,
        boardError: null,
        boardList,
      }),
      [LIST_FAILURE]: (state, { payload: error }) => ({
        ...state,
        boardError: error,
      }),
      [DETAIL_SUCCESS]: (state, { payload: response }) => ({///
        ...state,
        boardError: null,
        ...response
      }),
      [DETAIL_FAILURE]: (state, { payload: error }) => ({
        ...state,
        boardError: error,
      }),
    },
    initialState
);

export default board;
