import * as api from "../lib/api";
import { startLoading, finishLoading } from "./loading";
import { alertError, alertSuccess } from "./error";
import { takeLatest } from "redux-saga/effects";
import { call, put } from "redux-saga/effects";

const GET_EXAMPLE_DATA = "example/GET_EXAMPLE_DATA";
const GET_EXAMPLE_DATA_SUCCESS = "example/GET_EXAMPLE_DATA_SUCCESS";
const GET_EXAMPLE_DATA_FAILURE = "example/GET_EXAMPLE_DATA_FAILURE";
const GET_EXAMPLE_DATA_ALERT_SUCCESS = "example/GET_EXAMPLE_DATA_ALERT_SUCCESS";

const POST_EXAMPLE_DATA = "example/POST_EXAMPLE_DATA";
const POST_EXAMPLE_DATA_SUCCESS = "example/POST_EXAMPLE_DATA_SUCCESS";
const POST_EXAMPLE_DATA_FAILURE = "example/POST_EXAMPLE_DATA_FAILURE";

export const getExampleData = (data) => ({
  type: GET_EXAMPLE_DATA,
  data: data,
});

export const postExampleData = (data) => ({
  type: POST_EXAMPLE_DATA,
  data: data,
});

export const getInitializeExampleData = () => ({
  type: GET_EXAMPLE_DATA_ALERT_SUCCESS,
});

function* GetExampleData(action) {
  yield put(startLoading(GET_EXAMPLE_DATA));
  try {
    const userToken = yield call(api.getTokenFromLocalStorage);
    const response = yield call(
      api.getExample,
      action.data,
      userToken,
    );
    yield put(alertSuccess(GET_EXAMPLE_DATA));
    yield put({
      type: GET_EXAMPLE_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: GET_EXAMPLE_DATA_FAILURE,
      payload: e,
      error: true,
    });
    yield put(alertError(GET_EXAMPLE_DATA, e));
  }
  yield put(finishLoading(GET_EXAMPLE_DATA));
}

function* PostExampleData(action) {
  yield put(startLoading(POST_EXAMPLE_DATA));
  try {
    const userToken = yield call(api.getTokenFromLocalStorage);
    const response = yield call(
      api.postExample,
      action.data,
      userToken,
    );
    yield put({
      type: POST_EXAMPLE_DATA_SUCCESS
    });
    yield put(alertSuccess(POST_EXAMPLE_DATA));
  } catch (e) {
    yield put({
      type: POST_EXAMPLE_DATA_FAILURE,
      payload: e,
      error: true,
    });
    yield put(alertError(POST_EXAMPLE_DATA, e));
  }
  yield put(finishLoading(POST_EXAMPLE_DATA));
}

export function* exampleSaga() {
  yield takeLatest(GET_EXAMPLE_DATA, GetExampleData);
  yield takeLatest(POST_EXAMPLE_DATA, PostExampleData);
}

const initialState = {
  exampleData: null
};

export default function exampleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXAMPLE_DATA_SUCCESS:
      return {
        ...state,
        exampleData: action.payload,
      };
    case GET_EXAMPLE_DATA_ALERT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
