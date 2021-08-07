import { combineReducers } from "redux";
import loadingReducer from "./loading";
import errorReducer from "./error";
import { all } from "redux-saga/effects";
// import getArticleListReducer, { getArticleListSaga } from "./getArticleList";

// const rootReducer = combineReducers({
//   loadingReducer,
//   errorReducer,
//   getArticleListReducer,
// });

// export function* rootSaga() {
//   yield all([
//     getArticleListSaga(),
//   ]);
// }

// export default rootReducer;
