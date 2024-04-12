import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";

import {
  FETCH_POSTDATA,
  FETCH_POSTDATA_REJECTED,
  FETCH_POSTDATA_FULFILLED,
  DELETE_POSTDATA_FULFILLED,
  DELETE_POSTDATA_REJECTED,
  DELETE_POSTDATA,
  ADD_POSTDATA,
  ADD_POSTDATA_FULFILLED,
  ADD_POSTDATA_REJECTED,
  UPDATE_POSTDATA,
  UPDATE_POSTDATA_FULFILLED,
  UPDATE_POSTDATA_REJECTED,
} from "./constants";

import { getAllPost } from "../graphQl/query";
import client from "../utils/utils";
import { CREATE_POST, DELETE_POST, UPDATE_POST } from "../graphQl/mutation";

function* fetchPosts() {
  try {
    const { data } = yield call(client.query, { query: getAllPost });
    yield put({ type: FETCH_POSTDATA_FULFILLED, payload: data });
    console.log('triggered');
  } catch (err) {
    yield put({ type: FETCH_POSTDATA_REJECTED, payload: err });
  }
}
function* watchFetchPosts() {
  yield takeLatest(FETCH_POSTDATA, fetchPosts);
}

function* deletePosts(payload) {
  const { payload: id } = payload;
  try {
    yield call(client.mutate, {
      mutation: DELETE_POST,
      variables: { id: id },
    });
    yield put({ type: DELETE_POSTDATA_FULFILLED });
  } catch (error) {
    yield put({ type: DELETE_POSTDATA_REJECTED, payload: error });
  }
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POSTDATA, deletePosts);
}

function* addPost({ payload }) {
  const { title, description } = payload;
  try {
    yield call(client.mutate, {
      mutation: CREATE_POST,
      variables: { title, description },
    });
    yield put({ type: ADD_POSTDATA_FULFILLED });
  } catch (error) {
    yield put({ type: ADD_POSTDATA_REJECTED, payload: error });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POSTDATA, addPost);
}

function* updatePost({ payload }) {
  const { id, title, description } = payload;
  try {
    yield call(client.mutate, {
      mutation: UPDATE_POST,
      variables: { id, title, description },
    });
    yield put({ type: UPDATE_POSTDATA_FULFILLED });
  } catch (error) {
    yield put({ type: UPDATE_POSTDATA_REJECTED, payload: error });
  }
}

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POSTDATA, updatePost);
}

export default function* watchSagaActions() {
  yield all([
    watchFetchPosts(),
    watchDeletePost(),
    watchAddPost(),
    watchUpdatePost(),
  ]);
}
