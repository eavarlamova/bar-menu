import { 
  all, 
  fork,
} from "redux-saga/effects";

import usersSagaWatcher from "./usersSaga";
import productsSagaWatcher from "./productsSaga";

function* rootSaga() {
  yield all([fork(usersSagaWatcher), fork(productsSagaWatcher)]);
}

export default rootSaga;
