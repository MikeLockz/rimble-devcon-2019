import { put, takeEvery } from "redux-saga/effects";
import {
  RIMBLE_FETCH_ETH_PRICE,
  RIMBLE_RECEIVED_ETH_PRICE
} from "../actionTypes";

// fetch data from service using sagas
export function* fetchEthPrice(action) {
  const quote = yield fetch(
    "https://api.infura.io/v1/ticker/eth" + action.payload.value
  ).then(response => response.json());
  yield put({ type: RIMBLE_RECEIVED_ETH_PRICE, quote });
}

// app root saga
export function* appRootSaga() {
  yield takeEvery(RIMBLE_FETCH_ETH_PRICE, fetchEthPrice);
}

export default appRootSaga;
